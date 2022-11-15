export enum ExperienceAccessibility {
  'Wheelchair Accessible' = 'Wheelchair Accessible',
  'Wheelchair Accessible Bathroom' = 'Wheelchair Accessible Bathroom',
  'Wheelchair Accessible Parking' = 'Wheelchair Accessible Parking',
  'Wheelchair Accessible Entrance' = 'Wheelchair Accessible Entrance',
  'Wheelchair Accessible Seating' = 'Wheelchair Accessible Seating',
  'Wheelchair Accessible Table Height' = 'Wheelchair Accessible Table Height',
  'Wheelchair Accessible Counter Height' = 'Wheelchair Accessible Counter Height',
  'Wheelchair Accessible Path of Travel' = 'Wheelchair Accessible Path of Travel',
  'Wheelchair Accessible Restroom' = 'Wheelchair Accessible Restroom',
  'Wheelchair Accessible Shower' = 'Wheelchair Accessible Shower',
  'Wheelchair Accessible Tub' = 'Wheelchair Accessible Tub',
  'Wheelchair Accessible Vanity' = 'Wheelchair Accessible Vanity',
  'Wheelchair Accessible Toilet' = 'Wheelchair Accessible Toilet',
  'Wheelchair Accessible Transfer' = 'Wheelchair Accessible Transfer',
  'Wheelchair Accessible Bed' = 'Wheelchair Accessible Bed',
  'Wheelchair Accessible Pool' = 'Wheelchair Accessible Pool',
  'Wheelchair Accessible Beach' = 'Wheelchair Accessible Beach',
  'Wheelchair Accessible Spa' = 'Wheelchair Accessible Spa',
  'Wheelchair Accessible Gym' = 'Wheelchair Accessible Gym',
  'Wheelchair Accessible Sauna' = 'Wheelchair Accessible Sauna',
  'Wheelchair Accessible Hot Tub' = 'Wheelchair Accessible Hot Tub',
  'Wheelchair Accessible Elevator' = 'Wheelchair Accessible Elevator',
  'Wheelchair Accessible Stair Lift' = 'Wheelchair Accessible Stair Lift',
  'Wheelchair Accessible Ramp' = 'Wheelchair Accessible Ramp',
  'Wheelchair Accessible Lift' = 'Wheelchair Accessible Pool Lift',
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
