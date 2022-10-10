import { IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
