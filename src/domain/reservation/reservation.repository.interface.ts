import { Reservation } from './reservation.entity';

export interface IReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  getManyByReservableId(
    propertyId: string,
    from: Date,
    to: Date,
  ): Promise<Reservation[]>;
  getGuestReservations(
    guestId: string,
    status: string[],
  ): Promise<Reservation[]>;
  getPropertiesReservations(
    propertyIds: string[],
    status: string[],
  ): Promise<Reservation[]>;
  confirm(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
  cancelPendingReservationsPropertyInBetweenDates(
    propertyId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void>;
}
