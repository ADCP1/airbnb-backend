export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
}

export function getReservationStatusValues(): ReservationStatus[] {
  return Object.values(ReservationStatus);
}

export function getReservationStatusIn(
  param: string | undefined,
): ReservationStatus[] {
  if (!param) return getReservationStatusValues();
  return param.split(',') as ReservationStatus[];
}
