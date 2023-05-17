import { Injectable } from '@nestjs/common';
import { Beverage } from 'src/kiosk/beverage/beverage.interface';
import { Order } from './order/order';
import dayjs, { Dayjs } from 'dayjs';

export class IllegalArgumentException extends Error { }

@Injectable()
export class KioskService {

  private readonly OPEN_TIME = dayjs().hour(10).minute(0).second(0)
  private readonly CLOSE_TIME = dayjs().hour(22).minute(0).second(0)

  repo: Beverage[] = [];

  calculateTotalPrice() {
    return this.repo.map(item => item.getPrice()).reduce((x, y) => x + y, 0)
  }

  add(beverage: Beverage, count: number = 1) {
    if(count == 0)
      throw new IllegalArgumentException()

    for(let i = 0; i < count; i++){
      this.repo.push(beverage)
    }
  }

  remove(beverage: Beverage){
    this.repo = this.repo.filter(item => beverage !== item)
  }

  removeAll(){
    this.repo = []
  }

  createOrder(now: Dayjs){
    if(now.isBefore(this.OPEN_TIME) || now.isAfter(this.CLOSE_TIME))
      throw new IllegalArgumentException()

    return new Order(new Date(), this.repo)
  }
}
