import {
  getPaymentTypeValues,
  getReservationStatusValues,
  PaymentType,
  ReservationStatus,
} from '@domain/reservation';
import { IsAfterDateArgConstraint, IsAfterNowConstraint } from '@shared';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';

const reservationStatusValues = getReservationStatusValues();
const paymentTypeValues = getPaymentTypeValues();

export class CreatePropertyReservationDto {
  @IsString()
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

  @IsIn(paymentTypeValues)
  public paymentType: PaymentType;
}
