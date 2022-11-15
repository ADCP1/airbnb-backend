export enum ExperienceCategory {
  Food = 'Food',
  Culture = 'Culture',
  Nature = 'Nature',
  Nightlife = 'Nightlife',
  Sports = 'Sports',
  Course = 'Course',
  Wildlife = 'Wildlife',
  Other = 'Other',
}

export function getExperienceCategoriesValues(): ExperienceCategory[] {
  return Object.values(ExperienceCategory);
}

export function getExperienceCategoryIn(
  param: string | undefined,
): ExperienceCategory[] {
  if (!param) return getExperienceCategoriesValues();
  return param.split(',') as ExperienceCategory[];
}
