import { Property, PropertyAmenity } from '@domain/property';
import { LeanDocument, Types } from 'mongoose';

export class PropertyFactory {
  public static fromPropertyDoc(
    propertyDoc: LeanDocument<
      Omit<Property, 'id' | 'amenities'> & {
        _id: Types.ObjectId;
        amenities: string[];
      }
    >,
  ): Property {
    return new Property({
      ...propertyDoc,
      id: propertyDoc._id.toString(),
      amenities: propertyDoc.amenities as PropertyAmenity[],
    });
  }
}
