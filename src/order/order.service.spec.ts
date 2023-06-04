import { DomainModule } from '@/domain/domain.module';
import { Product } from '@/domain/entities/product.entity';
import { Stock } from '@/domain/entities/stock.entity';
import { ProductSellingType } from '@/domain/types/product-selling.type';
import { ProductType } from '@/domain/types/product.type';
import { ProductModule } from '@/product/product.module';
import { ProductRepository } from '@/product/product.repository';
import { StockRepository } from '@/stock/stock.repository';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { StockModule } from '@/stock/stock.module';
import { OrderModule } from './order.module';
import { Order } from '@/domain/entities/order.entity';
import { OrderProduct } from '@/domain/entities/order-product.entity';

describe('Order Service', () => {
  let osv: OrderService;
  let stockRepo: StockRepository;
  let productRepo: ProductRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          dropSchema: true,
          logging: true,
          entities: [Product, Stock, Order, OrderProduct],
        }),
        DomainModule,
        ProductModule,
        StockModule,
        OrderModule,
      ],
    }).compile();

    stockRepo = app.get<StockRepository>(StockRepository);
    productRepo = app.get<ProductRepository>(ProductRepository);
    osv = app.get<OrderService>(OrderService);
  });

  const createProduct = (
    productNumber,
    productType,
    productSellingType,
    name,
    price,
  ) => {
    const p1 = new Product();
    p1.productNumber = productNumber;
    p1.productType = productType;
    p1.productSellingType = productSellingType;
    p1.name = name;
    p1.price = price;
    return p1;
  };

  it('주문 번호 리스트를 받아 주문을 생성한다.', async () => {
    // given
    const p1 = createProduct(
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );
    const p2 = createProduct(
      '002',
      ProductType.HANDMADE,
      ProductSellingType.HOLD,
      '카페라떼',
      4500,
    );
    const p3 = createProduct(
      '003',
      ProductType.HANDMADE,
      ProductSellingType.STOP_SELLING,
      '크루아상',
      3500,
    );

    const s1 = new Stock();
    s1.productNumber = '001';
    s1.quantity = 2;

    const s2 = new Stock();
    s2.productNumber = '002';
    s2.quantity = 2;

    await productRepo.saveAll([p1, p2, p3]);
    await stockRepo.saveAll([s1, s2]);

    // when
    const res = await osv.createOrder(['001', '002']);

    // then
    expect(res).toMatchObject({
      totalPrice: 8500,
      products: [
        { productNumber: '001', price: 4000 },
        { productNumber: '002', price: 4500 },
      ],
    });
  });

  it('중복되는 상품번호 리스트로 주문할 수 있다.', async () => {
    // given
    const p1 = createProduct(
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );
    const p2 = createProduct(
      '002',
      ProductType.HANDMADE,
      ProductSellingType.HOLD,
      '카페라떼',
      4500,
    );
    const p3 = createProduct(
      '003',
      ProductType.HANDMADE,
      ProductSellingType.STOP_SELLING,
      '크루아상',
      3500,
    );

    const s1 = new Stock();
    s1.productNumber = '001';
    s1.quantity = 2;

    const s2 = new Stock();
    s2.productNumber = '002';
    s2.quantity = 2;

    await productRepo.saveAll([p1, p2, p3]);
    await stockRepo.saveAll([s1, s2]);

    // when
    const res = await osv.createOrder(['001', '001']);

    // then
    expect(res).toMatchObject({
      totalPrice: 8000,
      products: [
        { productNumber: '001', price: 4000 },
        { productNumber: '001', price: 4000 },
      ],
    });
  });

  it('주문 생성 시 재고 확인 및 개수 차감 후 생성하기', async () => {
    // given
    const p1 = createProduct(
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );
    const p2 = createProduct(
      '002',
      ProductType.HANDMADE,
      ProductSellingType.HOLD,
      '카페라떼',
      4500,
    );
    const p3 = createProduct(
      '003',
      ProductType.BAKERY,
      ProductSellingType.STOP_SELLING,
      '크루아상',
      3500,
    );

    const s1 = new Stock();
    s1.productNumber = '001';
    s1.quantity = 2;

    const s2 = new Stock();
    s2.productNumber = '002';
    s2.quantity = 2;

    await productRepo.saveAll([p1, p2, p3]);
    await stockRepo.saveAll([s1, s2]);

    // when
    const res = await osv.createOrder(['001', '001', '002', '003']);

    // then
    expect(res).toMatchObject({
      totalPrice: 16000,
      products: [
        { productNumber: '001', price: 4000 },
        { productNumber: '001', price: 4000 },
        { productNumber: '002', price: 4500 },
        { productNumber: '003', price: 3500 },
      ],
    });

    const stocks = await stockRepo.findAll();
    expect(stocks).toMatchObject([
      { productNumber: '001', quantity: 0 },
      { productNumber: '002', quantity: 1 },
    ]);
  });

  it('재고가 부족한 상품은 구매할 수 없다.', async () => {
    // given
    const p1 = createProduct(
      '001',
      ProductType.HANDMADE,
      ProductSellingType.SELLING,
      '아메리카노',
      4000,
    );

    const s1 = new Stock();
    s1.productNumber = '001';
    s1.quantity = 1;

    await productRepo.save(p1);
    await stockRepo.save(s1);

    // when
    const res = () => osv.createOrder(['001', '001']);

    // then
    expect(res).rejects.toThrow(new Error("재고가 부족합니다."))
  });
});
