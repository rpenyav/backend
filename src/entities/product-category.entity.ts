// src/entities/product-category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productCategoryName: string;

  @Column('text')
  productCategoryDescription: string;

  @OneToMany(() => Product, (product) => product.productIdCategory)
  products: Product[];
}
