import { ResponseDtos } from '@application/dtos';
import { Reservation } from '@domain/reservation';

export class ReservationFactory {
  public static toDto(
    reservation: Reservation,
  ): ResponseDtos.PropertyReservationDto {
    return {
      id: reservation.id!,
      propertyId: reservation.propertyId,
      guestId: reservation.guestId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      amountOfGuests: reservation.amountOfGuests,
      paymentType: reservation.paymentType,
    };
  }
}
