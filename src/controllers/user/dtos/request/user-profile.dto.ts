import {
  IsUrl,
  IsString,
  MaxLength,
  IsMobilePhone,
  IsCreditCard,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreditCardInfoDto {
  @IsCreditCard()
  @IsOptional()
  creditCardNumber: string;

  @IsDateString()
  @IsOptional()
  creditCardExpirationDate: Date;

  @IsString()
  @IsOptional()
  creditCardUsername: string;
}

export class UserProfileDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  location?: string;

  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @MaxLength(150)
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;

  @IsMobilePhone()
  @IsOptional()
  phone?: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  profession?: string;

  @IsOptional()
  creditCardInfo?: CreditCardInfoDto;
}
