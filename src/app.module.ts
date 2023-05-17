import { Module } from '@nestjs/common';
import { KioskModule } from './kiosk/kiosk.module';

@Module({
  imports: [KioskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
