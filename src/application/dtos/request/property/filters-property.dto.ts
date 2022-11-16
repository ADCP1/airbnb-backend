import {
  IsAfterDateArgConstraint,
  IsAfterNowConstraint,
} from '@shared/customValidations/dateValidations';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Validate,
} from 'class-validator';

export class PropertyFiltersDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  public startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  @Validate(IsAfterDateArgConstraint, ['startDate'])
  public endDate?: Date;

  @IsPositive()
  @IsOptional()
  capacity?: number;

  @IsPositive()
  @IsOptional()
  roomAmount?: number;

  @IsPositive()
  @IsOptional()
  toiletAmount?: number;

  @IsPositive()
  @IsOptional()
  amenities?: string[];

  @IsPositive()
  @IsOptional()
  minPrice?: number;

  @IsPositive()
  @IsOptional()
  maxPrice?: number;

  @IsOptional()
  @IsString({ each: true })
  languages?: string[];
}
