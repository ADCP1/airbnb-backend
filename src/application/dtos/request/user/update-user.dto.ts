import { Transform, Type } from 'class-transformer';
import {
  IsCreditCard,
  IsDateString,
  IsMobilePhone,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class CreditCardInfoDto {
  @IsCreditCard()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\s+/g, '') : value,
  )
  number: string;

  @IsDateString()
  expirationDate: string;

  @IsNumberString()
  @MaxLength(4)
  code: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @IsOptional()
  @IsUrl()
  pictureUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreditCardInfoDto)
  creditCardInfo?: CreditCardInfoDto;
}
