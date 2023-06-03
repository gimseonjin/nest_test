import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '@/domain/domain.module';
import { Product } from '@/domain/entities/product.entity';
import { ProductSellingType } from '@/domain/types/product-selling.type';
import { ProductType } from '@/domain/types/product.type';

describe('Product Repository', () => {
  let productRepo: ProductRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          entities: [Product],
        }),
        DomainModule,
      ],
      providers: [ProductRepository],
    }).compile();

    productRepo = app.get<ProductRepository>(ProductRepository);
  });

  const createProduct = (
    id,
    productNumber,
    productType,
    productSellingType,
    name,
    price,
  ) => {
    const p1 = new Product();
    p1.id = id;
    p1.productNumber = productNumber;
    p1.productType = productType;
    p1.productSellingType = productSellingType;
    p1.name = name;
    p1.price = price;
    return p1;
  };

  it('Product를 판매 상태로 조회할 수 있다.', async () => {
    // given
    const p1 = createProduct(
      1,
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );
    const p2 = createProduct(
      2,
      '002',
      ProductType.HANDMADE,
      ProductSellingType.HOLD,
      '카페라떼',
      4500,
    );
    const p3 = createProduct(
      3,
      '003',
      ProductType.HANDMADE,
      ProductSellingType.STOP_SELLING,
      '크루아상',
      3500,
    );

    await productRepo.saveAll([p1, p2, p3]);

    // when
    const result = await productRepo.findAllBySellingTypeIn([
      ProductSellingType.SELLING,
    ]);

    // then
    expect(result).toMatchObject([
      {
        productNumber: '001',
        productType: '제조 음료',
        productSellingType: '판매중',
        name: '아메리카노',
        price: 4000,
      },
    ]);
  });

  it('Product를 상품 번호로 조회할 수 있다.', async () => {
    // given
    const p1 = createProduct(
      1,
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );
    const p2 = createProduct(
      2,
      '002',
      ProductType.HANDMADE,
      ProductSellingType.HOLD,
      '카페라떼',
      4500,
    );
    const p3 = createProduct(
      3,
      '003',
      ProductType.HANDMADE,
      ProductSellingType.STOP_SELLING,
      '크루아상',
      3500,
    );

    await productRepo.saveAll([p1, p2, p3]);

    // when
    const result = await productRepo.findAllByProductNumberIn(['001', '002']);

    // then
    expect(result).toMatchObject([
      {
        productNumber: '001',
        productType: '제조 음료',
        productSellingType: '판매중',
        name: '아메리카노',
        price: 4000,
      },
      {
        productNumber: '002',
        productType: '제조 음료',
        productSellingType: '판매보류',
        name: '카페라떼',
        price: 4500,
      },
    ]);
  });
});
