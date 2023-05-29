import { Inject, Injectable } from "@nestjs/common";
import { ProductSellingType } from "src/product/domain/product-selling.type";
import { ProductRepository } from "src/product/domain/product.repository";

@Injectable()
export class ProductService{
  constructor(
    @Inject(ProductRepository) private readonly productRepository: ProductRepository
  ){}

  public getSellingProducts(){
    return this.productRepository.findAllBySellingTypeIn([ProductSellingType.SELLING, ProductSellingType.HOLD])
  }
}