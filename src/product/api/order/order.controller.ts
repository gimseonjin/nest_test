import { Inject, Injectable } from "@nestjs/common";
import { OrderService } from "./order.service";

@Injectable()
export class OrderController{
  constructor(
    @Inject(OrderService) private readonly orderService : OrderService
  ){}
}