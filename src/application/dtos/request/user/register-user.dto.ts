import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  password: string;
}
