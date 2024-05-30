import { IsString, IsInt } from 'class-validator';
export class CreateProductoAplicadoDto {
  @IsString()
  producto: string;

  @IsString()
  cantidad: string;
}
