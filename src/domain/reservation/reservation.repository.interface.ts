import { ResourceType } from '@domain/review';

import { Reservation } from './reservation.entity';
import { ReservationStatus } from './reservation-status';

export interface IReservationRepository {
  save(reservation: Reservation): Promise<void>;
  validatePropertyAvailability(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  getManyByReservableId(
    reservableId: string,
    from: Date,
    to: Date,
  ): Promise<Reservation[]>;
  getGuestReservations(
    guestId: string,
    status: string[],
    type: string,
  ): Promise<Reservation[]>;
  getReservations(
    reservableIds: string[],
    status: ReservationStatus[],
  ): Promise<Reservation[]>;
  confirm(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
  cancelPendingReservationsInBetweenDates(
    reservableId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void>;
  getTotalGuestAmountForReservationWithReservableId(
    reservableId: string,
  ): Promise<number>;
  review(reservationId: any, type: ResourceType): Promise<void>;
}
