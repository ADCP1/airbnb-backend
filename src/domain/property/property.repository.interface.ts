import { Property } from './property.entity';

export interface IPropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
}