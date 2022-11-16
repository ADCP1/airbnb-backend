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
import mongoose from 'mongoose';

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
    const properties = await PropertyDoc.find({}).limit(limit).lean();

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
  public async searchByFilters(filters: any): Promise<Property[]> {
    console.log('Params received');
    console.log('languages: ' + filters.languages);
    console.log('startDate: ' + filters.startDate);
    console.log('endDate: ' + filters.endDate);
    console.log('capacity: ' + filters.capacity);
    console.log('minPrice: ' + filters.minPrice);
    console.log('maxPrice: ' + filters.maxPrice);
    console.log('roomAmount: ' + filters.roomAmount);
    console.log('toiletAmount: ' + filters.toiletAmount);
    console.log('location: ' + filters.location);
    // falta propertyType

    const languageMatchingUsersArray: any[] = [];
    if (filters.languages) {
      const languagesParam = filters.languages;
      let languagesAsArray;
      if (languagesParam) {
        languagesAsArray = languagesParam.split(',');
      }

      const languageMatchingUsers = await UserDoc.find({
        languages: {
          $in: languagesAsArray,
        },
      });
      console.log('MATCH LANG', languageMatchingUsers);
      languageMatchingUsers.map(function (item) {
        languageMatchingUsersArray.push(item._id);
      });
      console.log(
        'valid users for language: ' +
          JSON.stringify(languageMatchingUsersArray),
      );
    }

    const unavailableProperties: any[] = [];
    let availableProperties: any[] = [];
    if (filters.startDate && filters.endDate) {
      const unavailableDates = await ReservationDoc.find({
        $or: [
          {
            $and: [
              { startDate: { $gt: `${filters.startDate}` } },
              { startDate: { $lt: `${filters.endDate}` } },
              { status: { $ne: 'cancelled' } },
            ],
          },
          {
            $and: [
              { endDate: { $gt: `${filters.startDate}` } },
              { endDate: { $lt: `${filters.endDate}` } },
              { status: { $ne: 'cancelled' } },
            ],
          },
        ],
      });

      unavailableDates.map(function (item) {
        const objectId = new mongoose.Types.ObjectId(item.propertyId);
        unavailableProperties.push(objectId);
      });
      availableProperties = await PropertyDoc.find({
        _id: { $nin: unavailableProperties },
      });
    }

    const query: { [k: string]: any } = {};

    if (filters.capacity) {
      query.capacity =
        filters.capacity === 'more' ? { $gte: 8 } : `${filters.capacity}`;
    }

    if (filters.minPrice && filters.maxPrice) {
      query.price = {
        $gte: `${filters.minPrice}`,
        $lte: `${filters.maxPrice}`,
      };
    }

    if (filters.roomAmount) {
      query.roomAmount =
        filters.roomAmount === 'more' ? { $gte: 8 } : `${filters.roomAmount}`;
    }

    if (filters.toiletAmount) {
      query.toiletAmount =
        filters.toiletAmount === 'more'
          ? { $gte: 8 }
          : `${filters.toiletAmount}`;
    }

    if (filters.location) {
      query.location = {
        $regex: new RegExp('^' + `${filters.location}`.toLowerCase(), 'i'),
      };
    }

    if (filters.amenities) {
      query.amenities = { $in: filters.amenities.split(',') };
    }
    console.log('LANG', languageMatchingUsersArray);
    if (filters.languages.split(',').length > 0) {
      query.ownerId = { $in: languageMatchingUsersArray };
    }

    if (availableProperties.length > 0) {
      query._id = { $in: availableProperties };
    }

    const properties = await PropertyDoc.find(query).sort('_id').skip(0).lean();

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
