import { ProductSellingType } from '@/domain/types/product-selling.type';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

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
