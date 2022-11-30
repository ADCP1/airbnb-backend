import {
  PaymentType,
  ReservableType,
  ReservationStatus,
} from '@domain/reservation';

export type ReservationDto = {
  id: string;
  reservableId: string;
  reservableType: ReservableType;
  guestId: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  amountOfGuests: number;
  paymentType: PaymentType;
  hostReviewed: boolean;
  guestReviewed: boolean;
  reservableReviewed: boolean;
};
