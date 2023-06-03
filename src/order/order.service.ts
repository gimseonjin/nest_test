import { Order } from '@/domain/entities/order.entity';
import { ProductRepository } from '@/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(ids: string[]) {
    const dupliacateProducts =
      await this.productRepository.findAllByProductNumberIn(ids);

    const order = Order.create(dupliacateProducts);

    await this.orderRepository.saveWithStockDecrease(order);

    return {
      totalPrice: order.totalPrice,
      products: dupliacateProducts,
    };
  }
}
