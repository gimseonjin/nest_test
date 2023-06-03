import { Order } from '@/domain/entities/order.entity';
import { ProductRepository } from '@/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { StockRepository } from '@/stock/stock.repository';
import { Product } from '@/domain/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @Inject(StockRepository)
    private readonly stockRepository: StockRepository,
  ) {}

  async createOrder(ids: string[]) {
    const dupliacateProducts = await this.findProductsBy(ids)

    await this.decreaseQuantityInStock(ids, dupliacateProducts)

    const order = Order.create(dupliacateProducts);

    await this.orderRepository.save(order);

    return {
      totalPrice: order.totalPrice,
      products: dupliacateProducts,
    };
  }

  async findProductsBy(ids: string[]){
    const products = await this.productRepository.findAllByProductNumberIn(ids);

    const dupliacateProducts = ids.map(x => {
      return products.find(y => y.productNumber == x)
    })

    return dupliacateProducts
  }

  async decreaseQuantityInStock(ids: string[], products: Product[]){
    const stocks = await this.stockRepository.findAllByProductNumberIn(ids);

    products.forEach(x => {
      const entity = stocks.find(y => y.productNumber == x.productNumber)
      entity.quantity --;
    })
    
    await this.stockRepository.saveAll(stocks);
  }
}
