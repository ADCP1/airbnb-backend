import {
  IPropertyRepository,
  Property,
  PropertyAmenity,
} from '@domain/property';
import { loadObjectIdentification } from '@infra/identification';
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
}

export const propertyRepository: IPropertyRepository = new PropertyRepository();
