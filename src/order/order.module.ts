import { DomainModule } from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductModule } from '@/product/product.module';
import { StockModule } from '@/stock/stock.module';
import { OrderRepository } from './order.repository';

@Module({
  imports: [DomainModule, ProductModule, StockModule],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
