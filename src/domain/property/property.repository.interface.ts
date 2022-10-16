import { Property } from './property.entity';

export interface IPropertyRepository {
  save(property: Property): Promise<void>;
}
