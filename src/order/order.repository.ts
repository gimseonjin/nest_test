import { OrderProduct } from '@/domain/entities/order-product.entity';
import { Order } from '@/domain/entities/order.entity';
import { Stock } from '@/domain/entities/stock.entity';
import { OrderStatus } from '@/domain/types/order.type';
import { ProductType } from '@/domain/types/product.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async saveWithStockDecrease(entity: {
    orderStatus: OrderStatus;
    totalPrice: number;
    orderProducts: OrderProduct[];
  }) {
    // 재고 관련 상품인지 파악
    const products = entity.orderProducts
      .map((x) => x.product)
      .filter((product) => ProductType.containsStockType(product.productType));

    // 상품 개수 counting
    const productCounts = products.reduce((counts, op) => {
      const productNumber = op.productNumber;
      if (!counts[productNumber]) {
        counts[productNumber] = 0;
      }
      counts[productNumber]++;
      return counts;
    }, {} as { [productNumber: string]: number });

    // Transaction
    await this.orderRepo.manager.transaction(async (em: EntityManager) => {
      const stocks = await em
        .createQueryBuilder(Stock, 'stock')
        .where('stock.productNumber IN (:...productsNumbers)', {
          productsNumbers: products.map((x) => x.productNumber),
        })
        .getMany();

      stocks.forEach((stock) => {
        stock.decreaseQuantity(productCounts[stock.productNumber]);
      });

      await em.save(Stock, stocks);
      await em.save(Order, entity);
    });
  }

  async save(entity: {
    orderStatus: OrderStatus;
    totalPrice: number;
    orderProducts: OrderProduct[];
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
    await Promise.all(entities.map((entity) => this.save(entity)));
  }
}
