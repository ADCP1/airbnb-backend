import { Reservation } from './reservation.entity';

export interface IReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  getPropertyReservations(
    propertyId: string,
    from: Date,
    to: Date,
  ): Promise<Reservation[]>;
}
