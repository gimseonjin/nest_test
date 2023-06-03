import { Stock } from '@/domain/entities/stock.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,
  ) {}

  async findAll() {
    return await this.stockRepo.find();
  }

  async findAllByProductNumberIn(ids: string[]) {
    return await this.stockRepo
      .createQueryBuilder('stock')
      .where('stock.productNumber IN (:...ids)', { ids })
      .getMany();
  }

  async save(entity: { productNumber: string; quantity: number }) {
    await this.stockRepo.save(entity);
  }

  async saveAll(
    entities: {
      productNumber: string;
      quantity: number;
    }[],
  ) {
    await this.stockRepo.save(entities);
  }

  async deleteAll() {
    await this.stockRepo.clear();
  }
}
