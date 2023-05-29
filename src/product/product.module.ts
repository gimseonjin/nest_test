import { Module } from '@nestjs/common';
import { ProductService } from './api/product/product.service';
import { ProductController } from './api/product/product.controller';
import { ProductRepository } from './domain/product.repository';
import { OrderService } from './api/order/order.service';

@Module({
  providers:[
    ProductRepository,
    ProductService,
    OrderService
  ],
  controllers:[
    ProductController
  ]
})
export class ProductModule {}
