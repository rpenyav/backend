// src/candidatos/dto/check-candidato.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CheckCandidatoDto {
  @IsInt()
  @IsNotEmpty()
  consultaId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
