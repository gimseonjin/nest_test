import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productNumber: string;

  @Column()
  quantity: number;

  public decreaseQuantity(count: number) {
    if (this.quantity < count) throw new Error('재고가 부족합니다.');
    this.quantity -= count;
  }
}
