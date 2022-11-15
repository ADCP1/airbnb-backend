export enum ExperienceLanguage {
  English = 'english',
  French = 'french',
  Spanish = 'spanish',
  Italian = 'italian',
  German = 'german',
  Portuguese = 'portuguese',
  Russian = 'russian',
  Arabic = 'arabic',
  Chinese = 'chinese',
  Japanese = 'japanese',
  Korean = 'korean',
}

export function getExperienceLanguagesValues(): ExperienceLanguage[] {
  return Object.values(ExperienceLanguage);
}

export function getExperienceLanguageIn(
  param: string | undefined,
): ExperienceLanguage[] {
  if (!param) return getExperienceLanguagesValues();
  return param.split(',') as ExperienceLanguage[];
}
