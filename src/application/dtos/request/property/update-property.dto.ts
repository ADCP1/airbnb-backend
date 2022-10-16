import { getPropertyAmenityValues, PropertyAmenity } from '@domain/property';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

const propertyAmenityValues = getPropertyAmenityValues();

export class UpdatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsPositive()
  @IsOptional()
  price?: number;

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
  surfaceArea?: number;

  @IsUrl(undefined, { each: true })
  @IsOptional()
  imagesUrls?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(propertyAmenityValues, { each: true })
  @IsOptional()
  services?: PropertyAmenity[];

  @IsString({ each: true })
  @IsOptional()
  rules?: string[];

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isPetFriendly?: boolean;
}
