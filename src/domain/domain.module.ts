import { Module } from '@nestjs/common';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct, Product, Stock])],
  exports: [TypeOrmModule],
})
export class DomainModule {}
