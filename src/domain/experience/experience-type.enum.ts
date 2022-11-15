export enum ExperienceType {
  Online = 'online',
  InPlace = 'in-place',
}

export function getExperienceTypesValues(): ExperienceType[] {
  return Object.values(ExperienceType);
}

export function getExperienceTypeIn(
  param: string | undefined,
): ExperienceType[] {
  if (!param) return getExperienceTypesValues();
  return param.split(',') as ExperienceType[];
}
