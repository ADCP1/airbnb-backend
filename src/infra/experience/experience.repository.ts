import { Experience, IExperienceRepository } from '@domain/experience';
import { loadObjectIdentification } from '@infra/identification';
import cloneDeep from 'clone-deep';

import { ExperienceDoc } from './experience.doc';
import { ExperienceFactory } from './experience.factory';

class ExperienceRepository implements IExperienceRepository {
  public async save(experience: Experience) {
    loadObjectIdentification(experience);
    await ExperienceDoc.updateOne(
      { _id: experience.id },
      { $set: cloneDeep({ ...experience }) },
      { upsert: true },
    );
  }

  public async findById(id: string): Promise<Experience | null> {
    const experienceDoc = await ExperienceDoc.findById(id).lean();
    if (!experienceDoc) return null;
    return ExperienceFactory.fromExperienceDoc(experienceDoc);
  }

  public async findByOwnerId(ownerId: string): Promise<Experience[]> {
    const experiences = await ExperienceDoc.find({ ownerId }).lean();
    return experiences.map((experience) =>
      ExperienceFactory.fromExperienceDoc(experience),
    );
  }

  public async findMany(limit: number): Promise<Experience[]> {
    const experiences = await ExperienceDoc.find({}).limit(limit).lean();

    return experiences.map((experience) =>
      ExperienceFactory.fromExperienceDoc(experience),
    );
  }
}

export const experienceRepository: IExperienceRepository =
  new ExperienceRepository();
