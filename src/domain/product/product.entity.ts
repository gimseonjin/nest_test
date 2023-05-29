import { ProductSellingType } from './product-selling.type';
import { ProductType } from './product.type';

export class Product {
  id: number;

  productNumber: string;

  productType: ProductType;

  productSellingType: ProductSellingType;

  name: string;

  price: number;

  createdAt: Date;

  updatedAt: Date;

  deleteadAt: Date;
}
