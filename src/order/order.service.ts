import { Order } from '@/domain/order/order.entity';
import { OrderRepository } from '@/domain/order/order.repository';
import { ProductRepository } from '@/domain/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
    @Inject(OrderRepository) private readonly orderRepository: OrderRepository,
  ) {}

  createOrder(ids: string[]) {
    const products = this.productRepository.findAllByProductNumberIn(ids);

    const order = Order.create(products);

    this.orderRepository.save(order);

    return {
      totalPrice: order.totalPrice,
      products: products,
    };
  }
}
