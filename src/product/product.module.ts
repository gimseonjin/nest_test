import { Module } from '@nestjs/common';
import { DomainModule } from '@/domain/domain.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DomainModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
