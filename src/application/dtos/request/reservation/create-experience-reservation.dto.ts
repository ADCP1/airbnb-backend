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
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

const paymentTypeValues = getPaymentTypeValues();

export class CreateExperienceReservationDto {
  @IsString()
  @IsNotEmpty()
  public experienceId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public endDate: Date;

  @IsOptional()
  @IsPositive()
  public amountOfGuests?: number;

  @IsIn(paymentTypeValues)
  public paymentType: PaymentType;
}
