export enum ExperienceAccessibility {
  'wheelchair_accessible' = 'Wheelchair Accessible',
  'parking_lot_accessible' = 'Parking Lot Accessible',
  'bathroom_accessible' = 'Bathroom Accessible',
  'flat_ground' = 'Flat Ground',
  'audio_detailed_information' = 'Detailed Audio or Verbal Information',
  'deaf_accessible' = 'Deaf People Accessible',
  'sign_language' = 'Sign Language',
  'seer_guide' = 'Designated Seer Guide',
  'no_external_stimuli' = 'No Extreme Sensory Stimuli',
  'quiet_space' = 'Quiet Rest Space',
}

export function getExperienceAccessibilityValues(): ExperienceAccessibility[] {
  return Object.values(ExperienceAccessibility);
}

export function getExperienceAccessibilityTypesIn(
  param: string | undefined,
): ExperienceAccessibility[] {
  if (!param) return getExperienceAccessibilityValues();
  return param.split(',') as ExperienceAccessibility[];
}
