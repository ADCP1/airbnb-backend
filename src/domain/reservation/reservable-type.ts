export enum ReservableType {
  Property = 'property',
  Experience = 'experience',
}

export function getReservableTypeValues(): ReservableType[] {
  return Object.values(ReservableType);
}
