import { ProductSellingType } from './product-selling.type';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductType } from './product.type';

describe('Product Respository', () => {
  const repo = new ProductRepository();

  afterEach(() => {
    repo.deleteAll();
  });

  it('원하는 판매 상태를 가진 상품들을 조회한다.', () => {
    // given
    const p1 = new Product();
    p1.id = 1;
    p1.productNumber = '001';
    p1.productType = ProductType.HANDMADE;
    p1.productSellingType = ProductSellingType.SELLING;
    p1.name = '아메리카노';
    p1.price = 4000;

    const p2 = new Product();
    p2.id = 2;
    p2.productNumber = '002';
    p2.productType = ProductType.HANDMADE;
    p2.productSellingType = ProductSellingType.HOLD;
    p2.name = '카페라떼';
    p2.price = 4300;

    const p3 = new Product();
    p3.id = 3;
    p3.productNumber = '003';
    p3.productType = ProductType.BAKERY;
    p3.productSellingType = ProductSellingType.STOP_SELLING;
    p3.name = '크루아상';
    p3.price = 4500;

    repo.saveAll([p1, p2, p3]);

    // when
    const result = repo.findAllBySellingTypeIn([
      ProductSellingType.SELLING,
      ProductSellingType.STOP_SELLING,
    ]);

    // then
    expect(result.length).toBe(2);
    expect(result).toMatchObject([
      {
        productNumber: '001',
        name: '아메리카노',
        productSellingType: ProductSellingType.SELLING,
      },
      {
        productNumber: '003',
        name: '크루아상',
        productSellingType: ProductSellingType.STOP_SELLING,
      },
    ]);
  });

  it('상품번호 리스트로 상품들을 조회한다.', () => {
    // given
    const p1 = new Product();
    p1.id = 1;
    p1.productNumber = '001';
    p1.productType = ProductType.HANDMADE;
    p1.productSellingType = ProductSellingType.SELLING;
    p1.name = '아메리카노';
    p1.price = 4000;

    const p2 = new Product();
    p2.id = 2;
    p2.productNumber = '002';
    p2.productType = ProductType.HANDMADE;
    p2.productSellingType = ProductSellingType.HOLD;
    p2.name = '카페라떼';
    p2.price = 4300;

    const p3 = new Product();
    p3.id = 3;
    p3.productNumber = '003';
    p3.productType = ProductType.BAKERY;
    p3.productSellingType = ProductSellingType.STOP_SELLING;
    p3.name = '크루아상';
    p3.price = 4500;

    repo.saveAll([p1, p2, p3]);

    // when
    const result = repo.findAllByProductNumberIn(['001', '003']);

    // then
    expect(result.length).toBe(2);
    expect(result).toMatchObject([
      {
        productNumber: '001',
        name: '아메리카노',
        productSellingType: ProductSellingType.SELLING,
      },
      {
        productNumber: '003',
        name: '크루아상',
        productSellingType: ProductSellingType.STOP_SELLING,
      },
    ]);
  });
});
