import { Controller, Get, Inject } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(@Inject(ProductService) private readonly ps: ProductService) {}

  @Get('/selling')
  public getSellingProducts() {
    return this.ps.getSellingProducts();
  }
}
