import { OrderProduct } from '@/domain/entities/order-product.entity';
import { Order } from '@/domain/entities/order.entity';
import { Product } from '@/domain/entities/product.entity';
import { Stock } from '@/domain/entities/stock.entity';
import { OrderStatus } from '@/domain/types/order.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async save(entity: {
    orderStatus: OrderStatus;
    totalPrice: number;
    orderProducts: OrderProduct[];
  }) {
    const products = entity.orderProducts;

    const ids = products.map((x) => x.product.productNumber);

    await this.orderRepo.manager.transaction(async (em: EntityManager) => {
      const stocks = await em
        .createQueryBuilder(Stock, 'stock')
        .where('stock.productNumber IN (:...ids)', { ids })
        .getMany();

      ids.forEach((id) => {
        const entity = stocks.find((stock) => stock.productNumber == id);
        entity.quantity--;
      });

      await em.save(Stock, stocks);
      await em.save(Order, entity);
    });
  }

  async saveAll(
    entities: {
      orderStatus: OrderStatus;
      totalPrice: number;
      orderProducts: OrderProduct[];
    }[],
  ) {
    await Promise.all(entities.map((entity) => this.save(entity)));
  }
}
