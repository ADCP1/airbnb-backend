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
}

export const propertyRepository: IPropertyRepository = new PropertyRepository();
