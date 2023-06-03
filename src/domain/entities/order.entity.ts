import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../types/order.type';
import { OrderProduct } from './order-product.entity';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity("Orders")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  orderStatus: OrderStatus;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  registeredDate: Date;

  @OneToMany(() => OrderProduct, (orderproduct) => orderproduct.order, { cascade: ["insert", "update"] })
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
