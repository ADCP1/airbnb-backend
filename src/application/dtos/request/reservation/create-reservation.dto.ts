import {
  getReservationStatusValues,
  ReservationStatus,
} from '@domain/reservation';
import {
  IsAfterDateArgConstraint,
  IsAfterNowConstraint,
} from '@shared/customValidations/dateValidations';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  Validate,
} from 'class-validator';

const reservationStatusValues = getReservationStatusValues();

export class CreateReservationDto {
  @IsMongoId()
  @IsNotEmpty()
  public propertyId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  public startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  @Validate(IsAfterDateArgConstraint, ['startDate'])
  public endDate: Date;

  @IsNotEmpty()
  @IsPositive()
  public amountOfGuests: number;

  @IsIn(reservationStatusValues)
  public status: ReservationStatus;
}
