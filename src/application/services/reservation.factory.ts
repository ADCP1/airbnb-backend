import { ResponseDtos } from '@application/dtos';
import { Reservation } from '@domain/reservation';

export class ReservationFactory {
  public static toDto(reservation: Reservation): ResponseDtos.ReservationDto {
    return {
      id: reservation.id!,
      propertyId: reservation.reservableId,
      guestId: reservation.guestId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      amountOfGuests: reservation.amountOfGuests,
      paymentType: reservation.paymentType,
    };
  }
}
