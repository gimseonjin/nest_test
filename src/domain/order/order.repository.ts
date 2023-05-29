import { Injectable } from '@nestjs/common';
import { Order } from '@/domain/order/order.entity';

@Injectable()
export class OrderRepository {
  private db: Order[] = [];

  save(order: Order) {
    this.db.push(order);
  }
}
