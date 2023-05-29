import { OrderProduct } from '../order-product/order-product.entity';
import { Product } from '../product/product.entity';
import { OrderStatus } from './order.type';

export class Order {
  id: number;

  orderStatus: OrderStatus;

  totalPrice: number;

  registeredDate: Date;

  orderProducts: OrderProduct[];

  static create(products: Product[]) {
    const entity = new Order();

    entity.orderStatus = OrderStatus.INIT;

    entity.totalPrice = products
      .map((x) => x.price)
      .reduce((x1, x2) => {
        return x1 + x2;
      });

    entity.orderProducts = products.map((x) => {
      const op = new OrderProduct();

      (op.order = entity), (op.product = x);

      return op;
    });

    return entity;
  }
}
