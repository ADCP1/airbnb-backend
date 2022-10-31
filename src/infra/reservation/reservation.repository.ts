import { IReservationRepository, Reservation } from '@domain/reservation';
import { loadObjectIdentification } from '@infra/identification';
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
}

export const reservationRepository: IReservationRepository =
  new ReservationRepository();
