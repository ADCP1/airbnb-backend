import {
  IReservationRepository,
  Reservation,
  ReservationStatus,
} from '@domain/reservation';
import { ResourceType } from '@domain/review';
import { loadObjectIdentification } from '@infra/identification';
import { DomainException } from '@shared';
import cloneDeep from 'clone-deep';

import { ReservationDoc } from './reservation.doc';

class ReservationRepository implements IReservationRepository {
  public async save(reservation: Reservation) {
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

  public async getManyByReservableId(
    reservableId: string,
    from: Date,
    to: Date,
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      reservableId: reservableId,
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
    type: string,
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      guestId,
      status: { $in: status },
      reservableType: { $eq: type },
    }).lean();
    return reservations.map(
      (reservation) =>
        new Reservation({
          id: reservation._id.toString(),
          ...reservation,
        }),
    );
  }

  public async getReservations(
    reservableIds: string[],
    status: ReservationStatus[],
  ): Promise<Reservation[]> {
    const reservations = await ReservationDoc.find({
      reservableId: { $in: reservableIds },
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

  public async cancelPendingReservationsInBetweenDates(
    reservableId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const reservations =
      await this.findReservationsByReservableIdInBetweenDatesAndStatus(
        reservableId,
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

  public async validatePropertyAvailability(
    reservation: Reservation,
  ): Promise<void> {
    const reservations =
      await this.findReservationsByReservableIdInBetweenDatesAndStatus(
        reservation.reservableId,
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

  public async getTotalGuestAmountForReservationWithReservableId(
    reservableId: string,
  ): Promise<number> {
    const reservations = await ReservationDoc.find({
      reservableId,
      status: ReservationStatus.Confirmed,
    })
      .select({ amountOfGuests: 1 })
      .lean();
    return reservations
      .map((reservation) => reservation.amountOfGuests)
      .reduce((accum, next) => accum + next, 0);
  }

  private async findReservationsByReservableIdInBetweenDatesAndStatus(
    reservableId: string,
    startDate: Date,
    endDate: Date,
    status: string,
  ): Promise<Reservation[] | null> {
    const reservations = await ReservationDoc.find({
      reservableId,
      status,
      $or: [
        {
          startDate: { $gte: startDate, $lt: endDate },
        },
        {
          endDate: { $gt: startDate, $lte: endDate },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gt: startDate },
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

  public async review(reservationId: any, type: ResourceType): Promise<void> {
    let updateField;
    switch (type) {
      case ResourceType.Host:
        updateField = { hostReviewed: true };
        break;
      case ResourceType.Guest:
        updateField = { guestReviewed: true };
        break;
      default:
        updateField = { reservableReviewed: true };
    }
    await ReservationDoc.updateOne(
      { _id: reservationId },
      { $set: updateField },
    );
  }
}

export const reservationRepository: IReservationRepository =
  new ReservationRepository();
