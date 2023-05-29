import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";

@Injectable()
export class OrderRepository{

  private db: Order[] = []

  constructor(){
  }

  save(order: Order){
    this.db.push(order)
  }
}