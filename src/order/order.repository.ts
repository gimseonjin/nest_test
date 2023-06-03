import { OrderProduct } from '@/domain/entities/order-product.entity';
import { Order } from '@/domain/entities/order.entity';
import { OrderStatus } from '@/domain/types/order.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async save(entity: {
    orderStatus: OrderStatus;
    totalPrice: number;
    orderProducts?: OrderProduct[];
  }) {
    await this.orderRepo.save(entity);
  }

  async saveAll(
    entities: {
      orderStatus: OrderStatus;
      totalPrice: number;
      orderProducts: OrderProduct[];
    }[],
  ) {
    await this.orderRepo.save(entities);
  }
}
