// src/controllers/product.controller.ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Body,
} from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductService } from './product.service';
import { PaginatedResponse } from './paginated-response.dto';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('add')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get('get')
  getAllProducts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<Product>> {
    return this.productService.getAllProducts(
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product | undefined> {
    return this.productService.getProductById(id);
  }

  @Get('category/:categoryId')
  async getProductsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategory(categoryId);
  }
}
