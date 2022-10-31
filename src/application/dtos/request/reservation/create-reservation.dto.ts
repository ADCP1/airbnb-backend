import {
  getReservationStatusValues,
  ReservationStatus,
} from '@domain/reservation';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

const reservationStatusValues = getReservationStatusValues();

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  public propertyId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public endDate: Date;

  @IsNotEmpty()
  @IsPositive()
  public amountOfGuests: number;

  @IsIn(reservationStatusValues)
  public status: ReservationStatus;
}
