import { Beverage } from "./beverage.interface";

export class Latte implements Beverage {
  getName(): string {
    return "Latte"
  }
  getPrice(): number {
    return 4500
  }
}