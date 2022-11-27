import {
  Experience,
  ExperienceAccessibility,
  ExperienceLanguage,
  IExperienceRepository,
} from '@domain/experience';
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

  public async searchByFilters(filters: any): Promise<Experience[]> {
    const query: { [k: string]: any } = {};
    if (filters.minPrice && filters.maxPrice) {
      query.price = {
        $gte: `${filters.minPrice}`,
        $lte: `${filters.maxPrice}`,
      };
    }
    if (filters.startDate && filters.endDate) {
      query.date = {
        $gte: `${filters.startDate}`,
        $lte: `${filters.endDate}`,
      };
    }
    if (filters.location) {
      query.location = {
        $regex: new RegExp('^' + `${filters.location}`.toLowerCase(), 'i'),
      };
    }
    if (filters.accessibility) {
      query.accessibility = { $in: filters.accessibility.split(',') };
    }
    if (filters.languages) {
      query.languages = { $in: filters.languages.split(',') };
    }
    if (filters.category) {
      query.category = { $in: filters.category.split(',') };
    }
    query.capacity = { $gt: 0 };

    const experiences = await ExperienceDoc.find(query)
      .sort('_id')
      .skip(0)
      .lean();

    return experiences.map(
      (experience) =>
        new Experience({
          id: experience._id.toString(),
          ...experience,
          accessibility: experience.accessibility as ExperienceAccessibility[],
          languages: experience.languages as ExperienceLanguage[],
        }),
    );
  }
}

export const experienceRepository: IExperienceRepository =
  new ExperienceRepository();
