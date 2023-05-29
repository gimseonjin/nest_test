import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ProductModule, OrderModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
