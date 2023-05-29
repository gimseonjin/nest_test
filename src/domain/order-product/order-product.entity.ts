import { Product } from '@/domain/product/product.entity';
import { Order } from '@/domain/order/order.entity';

export class OrderProduct {
  id: number;

  order: Order;

  product: Product;
}
