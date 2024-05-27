import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  productIdCategory: number;

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
}
