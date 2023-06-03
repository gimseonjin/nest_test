import { DomainModule } from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductModule } from '@/product/product.module';
import { OrderRepository } from './order.repository';

@Module({
  imports: [DomainModule, ProductModule],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
