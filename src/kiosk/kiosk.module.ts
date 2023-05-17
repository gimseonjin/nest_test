import { Module } from '@nestjs/common';
import { KioskService } from './kiosk.service';

@Module({
  providers: [KioskService]
})
export class KioskModule {}
