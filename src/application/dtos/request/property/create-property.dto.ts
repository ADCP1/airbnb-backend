import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsPositive()
  price: number;

  @IsPositive()
  capacity: number;

  @IsPositive()
  roomAmount: number;

  @IsPositive()
  toiletAmount: number;

  @IsPositive()
  surfaceArea: number;

  @IsUrl(undefined, { each: true })
  imagesUrls: string[];
}
