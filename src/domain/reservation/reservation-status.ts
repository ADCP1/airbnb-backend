export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
}

export function getReservationStatusValues(): ReservationStatus[] {
  return Object.values(ReservationStatus);
}
