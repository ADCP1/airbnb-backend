import {
  Experience,
  ExperienceAccessibility,
  ExperienceCategory,
  ExperienceLanguage,
  ExperienceType,
} from '@domain/experience';
import { LeanDocument, Types } from 'mongoose';

export class ExperienceFactoryFactory {
  public static fromExperienceDoc(
    experienceDoc: LeanDocument<
      Omit<
        Experience,
        'id' | 'category' | 'type' | 'languages' | 'accessibility'
      > & {
        _id: Types.ObjectId;
        category: string;
        type: string;
        languages: string[];
        accessibility: string[];
      }
    >,
  ): Experience {
    return new Experience({
      ...experienceDoc,
      id: experienceDoc._id.toString(),
      category: experienceDoc.category as ExperienceCategory,
      type: experienceDoc.type as ExperienceType,
      languages: experienceDoc.languages.map(
        (language) => language as ExperienceLanguage,
      ),
      accessibility: experienceDoc.accessibility.map(
        (accessibility) => accessibility as ExperienceAccessibility,
      ),
    });
  }
}
