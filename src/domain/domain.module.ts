import { Module } from '@nestjs/common';
import { OrderRepository } from './order/order.repository';
import { ProductRepository } from './product/product.repository';

@Module({
  providers: [ProductRepository, OrderRepository],
  exports: [ProductRepository, OrderRepository],
})
export class DomainModule {}
