import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}
