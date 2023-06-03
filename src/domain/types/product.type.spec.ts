import { ProductType } from './product.type';

describe('Product Type', () => {
  it('상품 타입이 재고 관련 타입인지를 체크한다.', () => {
    // given
    const t1 = ProductType.HANDMADE;
    const t2 = ProductType.BAKERY;

    // when
    const r1 = ProductType.containsStockType(t1);
    const r2 = ProductType.containsStockType(t2);

    // then
    expect(r1).toBeTruthy();
    expect(r2).not.toBeTruthy();
  });
});
