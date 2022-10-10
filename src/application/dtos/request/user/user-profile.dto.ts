import { IsUrl, IsString, MaxLength, IsMobilePhone, IsCreditCard, IsDate, IsOptional } from 'class-validator';

export class UserProfileDto {
  @IsString()
  username: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  location: string;

  @IsString({each: true})
  @IsOptional()
  languages: string[];

  @MaxLength(150)
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  pictureUrl: string;

  @IsMobilePhone()
  @IsOptional()
  phone: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  profession: string;

  @IsCreditCard()
  @IsOptional()
  creditCardNumber: string;

  @IsString()
  @IsOptional()
  creditCardExpirationDate: Date;

  @IsString()
  @IsOptional()
  creditCardUsername: string;
}
