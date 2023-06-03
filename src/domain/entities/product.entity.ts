import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSellingType } from '../types/product-selling.type';
import { ProductType } from '../types/product.type';
import { BaseEntity } from './base.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productNumber: string;

  @Column({ type: 'text' })
  productType: ProductType;

  @Column({ type: 'text' })
  productSellingType: ProductSellingType;

  @Column()
  name: string;

  @Column()
  price: number;
}
