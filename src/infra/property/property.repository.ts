import {
  IPropertyRepository,
  Property,
  PropertyAmenity,
} from '@domain/property';
import { loadObjectIdentification } from '@infra/identification';
import { DomainException, InternalServerException } from '@shared';
import cloneDeep from 'clone-deep';

import { PropertyDoc } from './property.doc';

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
    return new Property({
      id: property._id.toString(),
      ...property,
      amenities: property.amenities as PropertyAmenity[],
    });
  }

  public async findByOwnerId(ownerId: string): Promise<Property[]> {
    const properties = await PropertyDoc.find({ ownerId }).lean();
    return properties.map(
      (property) =>
        new Property({
          id: property._id.toString(),
          ...property,
          amenities: property.amenities as PropertyAmenity[],
        }),
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

  public async searchAll(): Promise<Property[]> {
    const properties = await PropertyDoc.find({}).sort('_id').skip(0).lean();

    return properties.map(
      (property) =>
        new Property({
          id: property._id.toString(),
          ...property,
          amenities: property.amenities as PropertyAmenity[],
        }),
    );
  }

  public async searchBy(searchText: string): Promise<Property[]> {
    const properties = await PropertyDoc.find({
      $text: {
        $search: `${searchText}`,
        $caseSensitive: false,
      },
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
}

export const propertyRepository: IPropertyRepository = new PropertyRepository();
