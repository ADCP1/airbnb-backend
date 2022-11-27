import { Experience } from './experience.entity';

export interface IExperienceRepository {
  save(experience: Experience): Promise<void>;
  findById(id: string): Promise<Experience | null>;
  searchByFilters(searchText: string[]): Promise<Experience[]>;
  findByOwnerId(ownerId: string): Promise<Experience[]>;
  findMany(limit: number): Promise<Experience[]>;
}
