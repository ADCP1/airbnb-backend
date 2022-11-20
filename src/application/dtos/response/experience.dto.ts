import {
  ExperienceAccessibility,
  ExperienceCategory,
  ExperienceLanguage,
  ExperienceType,
} from '@domain/experience';

export type ExperienceDto = {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: number;
  imagesUrls: string[];
  date: Date;
  type: ExperienceType;
  capacity: number;
  languages: ExperienceLanguage[];
  accessibility: ExperienceAccessibility[];
  category: ExperienceCategory;
};
export type ExperiencesDto = {
  experiences: ExperienceDto[];
};
