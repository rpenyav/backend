// src/entities/product.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: 'productIdCategory' })
  productIdCategory: ProductCategory;

  @Column()
  productName: string;

  @Column()
  productReference: string;

  @Column()
  productPrize: number;

  @Column()
  productStock: number;

  @Column('text')
  productDescription: string;

  @Column()
  productRate: number;
}
