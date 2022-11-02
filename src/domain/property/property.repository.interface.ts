import { Property } from './property.entity';

export interface IPropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
  searchBy(searchText: string | string[]): Promise<Property[]>;
  searchAll(): Promise<Property[]>;
  findByOwnerId(ownerId: string): Promise<Property[]>;
  deleteById(id: string): Promise<void>;
}
