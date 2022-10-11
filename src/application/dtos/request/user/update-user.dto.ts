import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsDateString,
  IsMobilePhone,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class CreditCardInfoDto {
  @IsCreditCard()
  number: string;

  @IsDateString()
  expirationDate: string;

  @IsNumberString()
  @MaxLength(4)
  code: string;
}

export class UpdateUserDto {
  @IsString()
  location: string;

  @IsString({ each: true })
  languages: string[];

  @MaxLength(500)
  description: string;

  @IsString()
  profession: string;

  @IsMobilePhone()
  phone: string;

  @IsUrl()
  pictureUrl: string;

  @ValidateNested()
  @Type(() => CreditCardInfoDto)
  creditCardInfo: CreditCardInfoDto;
}
