import { ProductSellingType } from "./product-selling.type"
import { ProductType } from "./product.type"

export class Product{
   id: number

   productNumber: String

   productType: ProductType

   productSellingType: ProductSellingType

   name: String

   price: number

   createdAt: Date;

   updatedAt: Date;

   deleteadAt: Date;
} 