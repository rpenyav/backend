// src/controllers/product.controller.ts
import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaginatedResponse } from './paginated-response.dto';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

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
  getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Product | undefined> {
    return this.productService.getProductById(id);
  }

  @Get('category/:categoryId')
  getProductsByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResponse<Product>> {
    return this.productService.getProductsByCategory(
      categoryId,
      page,
      limit,
      orderBy,
      orderDirection,
    );
  }
}
