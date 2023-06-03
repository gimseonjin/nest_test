export class ProductType {
  static HANDMADE = '제조 음료';
  static BOTTLE = '병 음료';
  static BAKERY = '베이커리';

  static containsStockType(type: ProductType): boolean {
    const sellingType: ProductType[] = [this.BOTTLE, this.HANDMADE];
    return sellingType.includes(type);
  }
}
