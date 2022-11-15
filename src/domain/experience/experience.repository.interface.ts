import { Experience } from './experience.entity';

export interface IExperienceRepository {
  save(experience: Experience): Promise<void>;
  findById(id: string): Promise<Experience | null>;
}
