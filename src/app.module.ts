import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ProductModule,
    OrderModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
