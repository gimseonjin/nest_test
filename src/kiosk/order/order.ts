import { Beverage } from "../beverage/beverage.interface"

export class Order {
  constructor(
    public readonly orderDateTime: Date,
    public readonly beverages: Beverage[]
  ){}
}