import { Module } from '@nestjs/common';
import { StockRepository } from './stock.repository';
import { DomainModule } from '@/domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [StockRepository],
  exports: [StockRepository],
})
export class StockModule {}
