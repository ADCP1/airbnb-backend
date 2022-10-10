import { Transform } from 'class-transformer';
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

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => new Date(value))
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  password: string;
}