import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsPositive()
  capacity: number;

  @IsPositive()
  duration: number;

  @IsUrl(undefined, { each: true })
  imagesUrls: string[];

  @IsNotEmpty()
  dates: Date[];

  @IsNotEmpty()
  type: string;
}
