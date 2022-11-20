import { IReservationRepository, Reservation } from '@domain/reservation';
import { loadObjectIdentification } from '@infra/identification';
import { DomainException } from '@shared';
import cloneDeep from 'clone-deep';

import { ReservationDoc } from './reservation.doc';

class ReservationRepository implements IReservationRepository {
  public async save(reservation: Reservation) {
    await this.validatePropertyAvailability(reservation);
    loadObjectIdentification(reservation);
    await ReservationDoc.updateOne(
      { _id: reservation.id },
      { $set: cloneDeep({ ...reservation }) },
      { upsert: true },
    );
  }

  public async findById(id: string): Promise<Reservation | null> {
    const reservation = await ReservationDoc.findById(id).lean();
    if (!reservation) return null;
    return new Reservation({
      id: reservation._id.toString(),
      ...reservation,
    });
  }

  public async getPropertyReservations(
    propertyId: string,
    from: Date,
    to: Date,
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      propertyId,
      status: 'confirmed',
      startDate: { $lt: to },
      endDate: { $gt: from },
    }).lean();
    return reservations.map(
      (reservation) =>
        new Reservation({
          id: reservation._id.toString(),
          ...reservation,
        }),
    );
  }

  public async getGuestReservations(
    guestId: string,
    status: string[],
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      guestId,
      status: { $in: status },
    }).lean();
    return reservations.map(
      (reservation) =>
        new Reservation({
          id: reservation._id.toString(),
          ...reservation,
        }),
    );
  }

  public async getPropertiesReservations(
    propertyIds: string[],
    status: string[],
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      propertyId: { $in: propertyIds },
      status: { $in: status },
    }).lean();
    return reservations.map(
      (reservation) =>
        new Reservation({
          id: reservation._id.toString(),
          ...reservation,
        }),
    );
  }

  public async confirm(id: string): Promise<void> {
    await ReservationDoc.updateOne(
      { _id: id },
      { $set: { status: 'confirmed' } },
    );
  }

  public async cancel(id: string): Promise<void> {
    await ReservationDoc.updateOne(
      { _id: id },
      { $set: { status: 'cancelled' } },
    );
  }

  public async cancelPendingReservationsPropertyInBetweenDates(
    propertyId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const reservations =
      await this.findReservationsByPropertyIdInBetweenDatesAndStatus(
        propertyId,
        startDate,
        endDate,
        'pending',
      );
    if (!reservations) return;
    await ReservationDoc.updateMany(
      { _id: { $in: reservations.map((reservation) => reservation.id) } },
      { $set: { status: 'cancelled' } },
    );
  }

  private async validatePropertyAvailability(
    reservation: Reservation,
  ): Promise<void> {
    const reservations =
      await this.findReservationsByPropertyIdInBetweenDatesAndStatus(
        reservation.propertyId,
        reservation.startDate,
        reservation.endDate,
        'confirmed',
      );
    if (reservations && reservations.length > 0) {
      throw new DomainException(
        'Property is not available for the selected dates.',
      );
    }
  }

  private async findReservationsByPropertyIdInBetweenDatesAndStatus(
    propertyId: string,
    startDate: Date,
    endDate: Date,
    status: string,
  ): Promise<Reservation[] | null> {
    const reservations = await ReservationDoc.find({
      propertyId,
      status,
      $or: [
        {
          startDate: { $gte: startDate, $lt: endDate },
        },
        {
          endDate: { $gt: startDate, $lte: endDate },
        },
      ],
    }).lean();
    if (!reservations) return null;
    return reservations.map(
      (reservation) =>
        new Reservation({
          id: reservation._id.toString(),
          ...reservation,
        }),
    );
  }
}

export const reservationRepository: IReservationRepository =
  new ReservationRepository();
