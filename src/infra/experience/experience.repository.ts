import { Experience, IExperienceRepository } from '@domain/experience';
import { loadObjectIdentification } from '@infra/identification';
import cloneDeep from 'clone-deep';

import { ExperienceDoc } from './experience.doc';

class ExperienceRepository implements IExperienceRepository {
  public async save(experience: Experience) {
    loadObjectIdentification(experience);
    await ExperienceDoc.updateOne(
      { _id: experience.id },
      { $set: cloneDeep({ ...experience }) },
      { upsert: true },
    );
  }
}

export const experienceRepository: IExperienceRepository =
  new ExperienceRepository();
