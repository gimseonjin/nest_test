import { Stock } from './stock.entity';

describe('Stock', () => {
  it('현재 재고 보다 많은 수량을 사용하려고 할 때, Error가 발생한다.', () => {
    // given
    const entity = new Stock();
    entity.productNumber = '001';
    entity.quantity = 2;

    // when
    const callDecreaseQuantity = () => entity.decreaseQuantity(3);

    // then
    expect(callDecreaseQuantity).toThrow(new Error('재고가 부족합니다.'));
  });
});
