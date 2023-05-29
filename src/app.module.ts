import { Module } from '@nestjs/common';
import { KioskModule } from './kiosk/kiosk.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [KioskModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
