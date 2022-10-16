export enum PropertyAmenity {
  Wifi = 'wifi',
  Television = 'television',
  Pool = 'pool',
  Backyard = 'backyard',
  Kitchen = 'kitchen',
}

export function getPropertyAmenityValues(): PropertyAmenity[] {
  return Object.values(PropertyAmenity);
}
