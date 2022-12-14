import { Property } from './property.entity';

export interface IPropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
  searchByFilters(searchText: string[]): Promise<Property[]>;
  findManyByText(searchText: string): Promise<Property[]>;
  findMany(limit: number): Promise<Property[]>;
  findByOwnerId(ownerId: string): Promise<Property[]>;
  deleteById(id: string): Promise<void>;
}
