// src/create-user.dto.ts
import { IsString, IsInt, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
