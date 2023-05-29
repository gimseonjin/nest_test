import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('/orders')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  @Post('')
  createOrder(@Body() body) {
    this.orderService.createOrder(body);
  }
}
