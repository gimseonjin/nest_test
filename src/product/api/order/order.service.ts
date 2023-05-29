import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../../../../src/product/domain/order.entity";
import { ProductRepository } from "../../../../src/product/domain/product.repository";
import { OrderRepository } from "../../../../src/product/domain/order.repository";

@Injectable()
export class OrderService{
  constructor(
    @Inject(ProductRepository) private readonly productRepository: ProductRepository,
    @Inject(OrderRepository) private readonly orderRepository : OrderRepository
  ){}

  createOrder(ids: String []){
    const products = this.productRepository.findAllByProductNumberIn(ids);

    const order = Order.create(products)

    this.orderRepository.save(order)

    return {
      totalPrice: order.totalPrice,
      products: products
    }
  }
}