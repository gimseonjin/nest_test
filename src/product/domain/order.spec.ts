import { Order } from "./order.entity"
import { OrderStatus } from "./order.type"
import { ProductSellingType } from "./product-selling.type"
import { Product } from "./product.entity"
import { ProductType } from "./product.type"

describe("Order Test", () => {
  it("order 객체 생성", () => {
    // Given
    const p1 = new Product()
    p1.id = 1
    p1.productNumber = "001"
    p1.productType = ProductType.HANDMADE
    p1.productSellingType = ProductSellingType.SELLING
    p1.name = "아메리카노"
    p1.price = 4000

    const p2 = new Product()
    p2.id = 2
    p2.productNumber = "002"
    p2.productType = ProductType.HANDMADE
    p2.productSellingType = ProductSellingType.HOLD
    p2.name = "카페라떼"
    p2.price = 4300

    // when
    const newOrder = Order.create([p1, p2])

    // then
    expect(newOrder).toMatchObject({
      totalPrice: 8300,
      orderStatus: OrderStatus.INIT,
      orderProducts: [
        {
          order: {
            orderStatus: '주문생성',
            totalPrice: 8300,
          },
          product: {
            id: 1,
            name: '아메리카노',
            price: 4000,
            productNumber: '001',
            productSellingType: '판매중',
            productType: '제조 음료',
          },
        },
        {
          order: {
            orderStatus: '주문생성',
            totalPrice: 8300,
          },
          product: {
            id: 2,
            name: '카페라떼',
            price: 4300,
            productNumber: '002',
            productSellingType: '판매보류',
            productType: '제조 음료',
          },
        },
      ],
    });
  })
})