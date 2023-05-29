import { Order } from "./order.entity"
import { Product } from "./product.entity"

export class OrderProduct {
  id: number

  order: Order

  product: Product
}