import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from '@/domain/domain.module';
import { StockRepository } from './stock.repository';
import { Stock } from '@/domain/entities/stock.entity';

describe('Product Repository', () => {
  let repo: StockRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          entities: [Stock],
        }),
        DomainModule,
      ],
      providers: [StockRepository],
    }).compile();

    repo = app.get<StockRepository>(StockRepository);
  });

  it('상품 Id를 통해 상품 판매 개수를 조회할 수 있다.', async () => {
    // given
    const s1 = new Stock();
    s1.productNumber = '001';
    s1.quantity = 2;

    const s2 = new Stock();
    s2.productNumber = '002';
    s2.quantity = 2;

    await repo.saveAll([s1, s2]);

    // when
    const result = await repo.findAllByProductNumberIn(['001']);

    // then
    expect(result).toMatchObject([
      {
        productNumber: '001',
        quantity: 2,
      },
    ]);
  });
});
