import { ResponseDtos } from '@application/dtos';
import { ReservableType, Reservation } from '@domain/reservation';

export class ReservationFactory {
  public static toDto(
    reservation: Reservation,
    reservableType: ReservableType,
  ): ResponseDtos.ReservationDto {
    return {
      id: reservation.id!,
      reservableId: reservation.reservableId,
      reservableType: reservableType,
      guestId: reservation.guestId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      amountOfGuests: reservation.amountOfGuests,
      paymentType: reservation.paymentType,
    };
  }
}
