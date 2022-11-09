import {
  IPropertyRepository,
  Property,
  PropertyAmenity,
} from '@domain/property';
import { loadObjectIdentification } from '@infra/identification';
import { ReservationDoc } from '@infra/reservation/reservation.doc';
import { UserDoc } from '@infra/user/user.doc';
import { DomainException, InternalServerException } from '@shared';
import cloneDeep from 'clone-deep';

import { PropertyDoc } from './property.doc';
import { PropertyFactory } from './property.factory';

class PropertyRepository implements IPropertyRepository {
  public async save(property: Property) {
    await this.validateOwner(property);
    loadObjectIdentification(property);
    await PropertyDoc.updateOne(
      { _id: property.id },
      { $set: cloneDeep({ ...property }) },
      { upsert: true },
    );
  }

  public async findById(id: string): Promise<Property | null> {
    const property = await PropertyDoc.findById(id).lean();
    if (!property) return null;
    return PropertyFactory.fromPropertyDoc(property);
  }

  public async findByOwnerId(ownerId: string): Promise<Property[]> {
    const properties = await PropertyDoc.find({ ownerId }).lean();
    return properties.map((property) =>
      PropertyFactory.fromPropertyDoc(property),
    );
  }

  public async deleteById(id: string) {
    await PropertyDoc.deleteOne({ _id: id });
  }

  private async validateOwner(property: Property) {
    if (!property.id) return;
    const propertyDoc = await PropertyDoc.findById(property.id).lean();
    if (!propertyDoc) {
      throw new InternalServerException(
        `Tried to save a property with an invalid id ${property.id}`,
      );
    }
    if (propertyDoc.ownerId !== property.ownerId) {
      throw new DomainException("Cannot reassign a property's owner");
    }
  }

  public async findMany(limit: number): Promise<Property[]> {
    const properties = await PropertyDoc.find().limit(limit).lean();

    return properties.map((property) =>
      PropertyFactory.fromPropertyDoc(property),
    );
  }

  public async findManyByText(searchText: string): Promise<Property[]> {
    const properties = await PropertyDoc.find({
      $text: {
        $search: searchText,
        $caseSensitive: false,
      },
    })
      .sort('_id')
      .lean(); // TODO we should paginate these results

    return properties.map((property) =>
      PropertyFactory.fromPropertyDoc(property),
    );
  }

  //LIO
  public async searchByFilters(searchText: string[]): Promise<Property[]> {
    console.log('Params received');
    console.log('searchText[0] - languages: ' + searchText.at(0));
    console.log('searchText[1] - startDate: ' + searchText.at(1));
    console.log('searchText[2] - endDate: ' + searchText.at(2));
    console.log('searchText[3] - capacity: ' + searchText.at(3));
    console.log('searchText[4] - minPrice: ' + searchText.at(4));
    console.log('searchText[5] - maxPrice: ' + searchText.at(5));
    console.log('searchText[6] - roomAmount: ' + searchText.at(6));
    console.log('searchText[7] - toiletAmount: ' + searchText.at(7));
    console.log('searchText[8] - location: ' + searchText.at(8));

    const languagesParam = searchText.at(0);
    let languagesAsArray;
    if (languagesParam) {
      languagesAsArray = languagesParam.split(',');
    }
    //se filtran los idiomas->usuarios
    const languageMatchingUsers = await UserDoc.find(
      {
        languages: {
          $in: languagesAsArray,
        },
      },

      {
        _id: 1,
        email: 0,
        password: 0,
        name: 0,
        lastName: 0,
        phone: 0,
        dateOfBirth: 0,
        location: 0,
        languages: 0,
        description: 0,
        profession: 0,
        pictureUrl: 0,
        creditCardInfo: 0,
        __v: 0,
      },
    );

    const languageMatchingUsersArray: any[] = [];
    languageMatchingUsers.map(function (item) {
      languageMatchingUsersArray.push(item._id);
    });

    console.log('valid ids: ' + JSON.stringify(languageMatchingUsersArray));

    //se filtran las fechas disponibles

    const availableDates = await ReservationDoc.find({
      $or: [
        { startDate: { $gte: `${searchText.at(2)}` } },
        { endDate: { $lte: `${searchText.at(1)}` } },
      ],
    });

    const datesMatchingPropertiesArray: any[] = [];
    availableDates.map(function (item) {
      datesMatchingPropertiesArray.push(item.propertyId);
    });

    console.log(
      'available properties: ' + JSON.stringify(datesMatchingPropertiesArray),
    );

    //main search
    const properties = await PropertyDoc.find({
      capacity: `${searchText.at(3)}`,
      price: { $gte: `${searchText.at(4)}`, $lte: `${searchText.at(5)}` },
      roomAmount: `${searchText.at(6)}`,
      toiletAmount: `${searchText.at(7)}`,
      //location: `${searchText.at(8)}`,
      location: {
        $regex: new RegExp('^' + `${searchText.at(8)}`.toLowerCase(), 'i'),
      },
      ownerId: { $in: languageMatchingUsersArray },
      //LIO: revisar esto que no se como matchear el ObjectID con los id que recibo de las availablePOroperties
      //LIO: idea-> crear un campo en properties que sea CODE (String) y matchear por ese code?
      //_id : {"$in": datesMatchingPropertiesArray}
      //$eq: [ "$_id", {$toString: {"$in": datesMatchingPropertiesArray}}]
    })
      .sort('_id')
      .skip(0)
      .lean();

    return properties.map(
      (property) =>
        new Property({
          id: property._id.toString(),
          ...property,
          amenities: property.amenities as PropertyAmenity[],
        }),
    );
  }
  searchBy(searchText: string): Promise<Property[]> {
    throw new Error('Method not implemented.');
  }
  searchAll(): Promise<Property[]> {
    throw new Error('Method not implemented.');
  }
}

export const propertyRepository: IPropertyRepository = new PropertyRepository();
