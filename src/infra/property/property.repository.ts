import { IPropertyRepository, Property } from '@domain/property';
import { DomainException } from '@shared';

import { PropertyDoc } from './property.doc';

class PropertyRepository implements IPropertyRepository {
  public async save(property: Property) {
    await this.validateOwner(property);
    await PropertyDoc.updateOne(
      { _id: property.id }, // TODO This leaves the id as null on creation
      { $set: property },
      { upsert: true },
    );
  }

  public async findById(id: string): Promise<Property | null> {
    return PropertyDoc.findById(id);
  }

  private async validateOwner(property: Property) {
    if (!property.id) return;
    const propertyDoc = await PropertyDoc.findById(property.id);
    if (propertyDoc.ownerId !== property.ownerId) {
      throw new DomainException("Cannot reassign a property's owner");
    }
  }
}

export const propertyRepository: IPropertyRepository = new PropertyRepository();
