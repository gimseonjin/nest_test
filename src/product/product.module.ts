import { Module } from '@nestjs/common';
import { DomainModule } from '@/domain/domain.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

@Module({
  imports: [DomainModule],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
