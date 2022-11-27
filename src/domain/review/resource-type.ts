export enum ResourceType {
  Property = 'property',
  Experience = 'experience',
  Owner = 'owner',
  Guest = 'guest',
}

export function getResourceTypeValues(): ResourceType[] {
  return Object.values(ResourceType);
}
