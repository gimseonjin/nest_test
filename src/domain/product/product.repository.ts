import { Injectable } from '@nestjs/common';
import { ProductSellingType } from './product-selling.type';
import { Product } from './product.entity';
import { ProductType } from './product.type';

@Injectable()
export class ProductRepository {
  private db: Product[] = [];

  initDb() {
    const p1 = new Product();
    p1.id = 1;
    p1.productNumber = '001';
    p1.productType = ProductType.HANDMADE;
    p1.productSellingType = ProductSellingType.SELLING;
    p1.name = '아메리카노';
    p1.price = 4000;

    const p2 = new Product();
    p2.id = 2;
    p2.productNumber = '002';
    p2.productType = ProductType.HANDMADE;
    p2.productSellingType = ProductSellingType.HOLD;
    p2.name = '카페라떼';
    p2.price = 4300;

    const p3 = new Product();
    p3.id = 3;
    p3.productNumber = '003';
    p3.productType = ProductType.BAKERY;
    p3.productSellingType = ProductSellingType.STOP_SELLING;
    p3.name = '크루아상';
    p3.price = 4500;

    this.db.push(p1);
    this.db.push(p2);
    this.db.push(p3);
  }

  findAllByProductNumberIn(productNumbers: string[]) {
    return this.db.filter((x) => productNumbers.includes(x.productNumber));
  }

  findAllBySellingTypeIn(sellingTypes: ProductSellingType[]) {
    return this.db.filter((x) => sellingTypes.includes(x.productSellingType));
  }

  save(product: Product) {
    this.db.push(product);
  }

  saveAll(products: Product[]) {
    this.db.push(...products);
  }

  deleteAll() {
    this.db = [];
  }
}
