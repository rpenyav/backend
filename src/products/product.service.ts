// src/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './create-product.dto';
import { PaginatedResponse } from './paginated-response.dto';
import { ProductCategory } from 'src/entities/product-category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.productCategoryRepository.findOne({
      where: { id: createProductDto.productIdCategory },
    });

    if (!category) {
      throw new Error('Product category not found');
    }

    const newProduct = this.productRepository.create({
      ...createProductDto,
      productIdCategory: category,
    });

    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async getAllProducts(
    page: number,
    limit: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Product>> {
    const skip = (page - 1) * limit;
    let query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productIdCategory', 'category')
      .skip(skip >= 0 ? skip : 0)
      .take(limit > 0 ? limit : 10);

    if (orderBy && orderDirection) {
      query = query.orderBy(`product.${orderBy}`, orderDirection);
    }

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / limit);
    const isLast = page === totalPages;

    return {
      list,
      pageNumber: page,
      pageSize: limit,
      totalElements,
      totalPages,
      isLast,
    };
  }

  async getProductById(productId: number): Promise<Product | undefined> {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['productIdCategory'],
    });
  }

  async getProductsByCategory(
    categoryId: number,
    page: number,
    limit: number,
    orderBy?: string,
    orderDirection?: 'ASC' | 'DESC',
  ): Promise<PaginatedResponse<Product>> {
    const skip = (page - 1) * limit;
    let query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productIdCategory', 'category')
      .where('category.id = :categoryId', { categoryId })
      .skip(skip >= 0 ? skip : 0)
      .take(limit > 0 ? limit : 10);

    if (orderBy && orderDirection) {
      query = query.orderBy(`product.${orderBy}`, orderDirection);
    }

    const [list, totalElements] = await query.getManyAndCount();
    const totalPages = Math.ceil(totalElements / limit);
    const isLast = page === totalPages;

    return {
      list,
      pageNumber: page,
      pageSize: limit,
      totalElements,
      totalPages,
      isLast,
    };
  }
}
