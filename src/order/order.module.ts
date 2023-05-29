import { DomainModule } from '@/domain/domain.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';

@Module({
  imports: [DomainModule],
  providers: [OrderService],
})
export class OrderModule {}
