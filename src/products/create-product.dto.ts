// src/services/create-product.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productName: string;

  @IsString()
  productReference: string;

  @IsNumber()
  productPrize: number;

  @IsNumber()
  productStock: number;

  @IsString()
  productDescription: string;

  @IsNumber()
  productRate: number;

  @IsOptional()
  @IsString()
  productImage?: string;

  @IsNumber()
  productIdCategory: number;
}
