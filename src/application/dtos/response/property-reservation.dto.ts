import { PaymentType, ReservationStatus } from '@domain/reservation';

export type PropertyReservationDto = {
  id: string;
  propertyId: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  amountOfGuests: number;
  paymentType: PaymentType;
};
