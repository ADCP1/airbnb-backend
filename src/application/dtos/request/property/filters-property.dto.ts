import { IsAfterDateArgConstraint, IsAfterNowConstraint } from '@shared';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
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
