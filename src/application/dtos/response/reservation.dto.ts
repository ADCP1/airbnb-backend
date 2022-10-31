import { ReservationStatus } from '@domain/reservation';

export type ReservationDto = {
  id: string;
  propertyId: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  amountOfGuests: number;
};