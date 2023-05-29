import { ProductRepository } from '@/domain/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ProductSellingType } from 'src/domain/product/product-selling.type';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  public getSellingProducts() {
    return this.productRepository.findAllBySellingTypeIn([
      ProductSellingType.SELLING,
      ProductSellingType.HOLD,
    ]);
  }
}
