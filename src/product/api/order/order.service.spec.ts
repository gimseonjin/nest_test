import { OrderRepository } from "../../../../src/product/domain/order.repository"
import { ProductSellingType } from "../../../../src/product/domain/product-selling.type"
import { Product } from "../../../../src/product/domain/product.entity"
import { ProductRepository } from "../../../../src/product/domain/product.repository"
import { ProductType } from "../../../../src/product/domain/product.type"
import { OrderService } from "./order.service"

describe("Order Service", () => {

  const productRepo = new ProductRepository()
  const orderRepo = new OrderRepository()
  const service = new OrderService(productRepo, orderRepo)

  const createProduct = (
    id, productNumber, productType, productSellingType, name, price
  ) => {
    let p1 = new Product()
    p1.id = id
    p1.productNumber = productNumber
    p1.productType = productType
    p1.productSellingType = productSellingType
    p1.name = name
    p1.price = price
    return p1
  }

  it("주문 번호 리스트를 받아 주문을 생성한다.", () => {
    // given
    const p1 = createProduct(1, "001", ProductType.HANDMADE, ProductSellingType.SELLING, "아메리카노", 4000)
    const p2 = createProduct(2, "002", ProductType.HANDMADE, ProductSellingType.HOLD, "카페라떼", 4500)
    const p3 = createProduct(3, "003", ProductType.HANDMADE, ProductSellingType.STOP_SELLING, "크루아상", 3500)

    productRepo.saveAll([p1,p2,p3])

    // when
    const res = service.createOrder(["001", "002"])

    // then
    expect(res).toMatchObject({
      totalPrice: 8500,
      products: [
        { productNumber: "001", price: 4000 },
        { productNumber: "002", price: 4500 },
      ]
    })
  })
})