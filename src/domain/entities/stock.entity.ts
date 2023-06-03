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
}
