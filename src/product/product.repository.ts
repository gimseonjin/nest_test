import { Product } from '@/domain/entities/product.entity';
import { ProductSellingType } from '@/domain/types/product-selling.type';
import { ProductType } from '@/domain/types/product.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAllByProductNumberIn(ids: string[]) {
    return await this.productRepo
      .createQueryBuilder('product')
      .where('product.productNumber IN (:...ids)', { ids })
      .getMany();
  }

  async findAllBySellingTypeIn(ids: ProductSellingType[]) {
    return await this.productRepo
      .createQueryBuilder('product')
      .where('product.productSellingType IN (:...ids)', { ids })
      .getMany();
  }

  async save(entity: {
    productNumber: string;
    productType: ProductType;
    productSellingType: ProductSellingType;
    name: string;
    price: number;
  }) {
    await this.productRepo.save(entity);
  }

  async saveAll(
    entities: {
      productNumber: string;
      productType: ProductType;
      productSellingType: ProductSellingType;
      name: string;
      price: number;
    }[],
  ) {
    await this.productRepo.save(entities);
  }

  async deleteAll() {
    await this.productRepo.clear();
  }
}
