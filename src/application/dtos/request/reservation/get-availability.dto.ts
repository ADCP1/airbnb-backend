import { IsAfterDateArgConstraint, IsAfterNowConstraint } from '@shared';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Validate } from 'class-validator';

export class GetAvailabilityDto {
  @IsString()
  @IsNotEmpty()
  public reservableId: string;

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
