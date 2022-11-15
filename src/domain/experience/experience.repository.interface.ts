import { Experience } from './experience.entity';

export interface IExperienceRepository {
  save(experience: Experience): Promise<void>;
}
