import { Beverage } from "./beverage.interface";

export class Americano implements Beverage{
  getName(): string {
    return "Americano"
  }
  getPrice(): number {
    return 4000
  }
}