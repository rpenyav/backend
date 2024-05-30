import {
  IsString,
  IsInt,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTratamientoDto } from './create-tratamiento.dto';
import { CreateProductoAplicadoDto } from './create-producto-aplicado.dto';

export class CreateConsultaDto {
  @IsInt()
  idPaciente: number;

  @IsInt()
  idCliente: number;

  @IsString()
  motivoConsulta: string;

  @IsString()
  descripcionConsulta: string;

  @IsDate()
  @Type(() => Date)
  fechaConsulta: Date;

  @IsString()
  anamnesisConsulta: string;

  @IsString()
  eog_mucosas: string;

  @IsString()
  eog_temperatura: string;

  @IsString()
  eog_peso: string;

  @IsString()
  eog_condicioncorporal: string;

  @IsString()
  eog_estadoSensorio: string;

  @IsString()
  eog_hidratacion: string;

  @IsString()
  eop_piel: string;

  @IsInt()
  eop_piel_observaciones: number;

  @IsString()
  eop_ojos: string;

  @IsInt()
  eop_ojos_observaciones: number;

  @IsString()
  eop_oidos: string;

  @IsString()
  eop_oidos_observaciones: string;

  @IsString()
  eop_sisdigestivo: string;

  @IsString()
  eop_sisdigestivo_observaciones: string;

  @IsString()
  eop_cardiovascular: string;

  @IsString()
  eop_cardiovascular_observaciones: string;

  @IsString()
  eop_respiratorio: string;

  @IsString()
  eop_respiratorio_observaciones: string;

  @IsString()
  eop_urinario: string;

  @IsString()
  eop_urinario_observaciones: string;

  @IsString()
  eop_nervioso: string;

  @IsString()
  eop_nervioso_observaciones: string;

  @IsString()
  eop_linfatico: string;

  @IsString()
  eop_linfatico_observaciones: string;

  @IsString()
  eop_locomotor: string;

  @IsString()
  eop_locomotor_observaciones: string;

  @IsString()
  eop_reproductor: string;

  @IsString()
  eop_reproductor_observaciones: string;

  @IsString()
  diagnosticoConsulta: string;

  @IsString()
  observacionesConsulta: string;

  @IsDate()
  @Type(() => Date)
  proximoControlConsulta: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTratamientoDto)
  tratamientos: CreateTratamientoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductoAplicadoDto)
  productosAplicados: CreateProductoAplicadoDto[];
}
