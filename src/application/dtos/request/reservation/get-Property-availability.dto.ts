import { IsAfterDateArgConstraint, IsAfterNowConstraint } from '@shared';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Validate } from 'class-validator';

export class GetPropertyAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  public propertyId: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  public from: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  @Validate(IsAfterDateArgConstraint, ['from'])
  public to: Date;
}
