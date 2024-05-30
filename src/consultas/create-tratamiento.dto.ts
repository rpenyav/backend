import { IsString, IsInt } from 'class-validator';

export class CreateTratamientoDto {
  @IsString()
  nombre: string;

  @IsString()
  dosis: string;
}
