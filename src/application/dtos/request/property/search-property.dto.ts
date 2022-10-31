import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

export class SearchPropertyDto {
  @IsString()
  @IsNotEmpty()
  searchProperty: string;
}
