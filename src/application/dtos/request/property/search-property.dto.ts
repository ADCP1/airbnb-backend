import { IsNotEmpty, IsString } from 'class-validator';

export class SearchPropertyDto {
  @IsString()
  @IsNotEmpty()
  searchProperty: string;
}
