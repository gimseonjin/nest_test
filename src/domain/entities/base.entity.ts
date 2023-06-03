import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteadAt: Date;
}
