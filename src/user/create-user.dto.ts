// src/create-user.dto.ts
import {
  IsString,
  IsInt,
  IsEmail,
  MinLength,
  IsOptional,
  IsDate,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  address: string;

  @IsString()
  postalcode: string;

  @IsString()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  especialidad: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsEnum(['paciente', 'admin', 'doctor', 'cliente'])
  role: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// src/get-user.dto.ts
export class UserDto {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  address: string;
  postalcode: string;
  phone1: string;
  phone2: string;
  especialidad: string;
  startDate?: Date;
  role: string;
  isActive: boolean;
}
