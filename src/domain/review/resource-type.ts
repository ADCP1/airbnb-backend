export enum ResourceType {
  Property = 'property',
  Experience = 'experience',
  Host = 'host',
  Guest = 'guest',
}

export function getResourceTypeValues(): ResourceType[] {
  return Object.values(ResourceType);
}
