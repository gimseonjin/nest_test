import dayjs from 'dayjs';
import { Americano } from './beverage/americano.entity';
import { Latte } from './beverage/latte.entity';
import { IllegalArgumentException, KioskService } from './kiosk.service';

describe("Cafe Kiosk Test", () => {
  it("Add", () => {
    const kioskService = new KioskService()
    kioskService.add(new Americano())

    expect(kioskService.repo.length).toBe(1)
    expect(kioskService.repo[0].getName()).toBe("Americano")
  })

  it("Remove", () => {
    const kioskService = new KioskService()
    const americano = new Americano()
    kioskService.add(americano)
    expect(kioskService.repo.length).toBe(1)

    kioskService.remove(americano)
    expect(kioskService.repo.length).toBe(0)
  })

  it("Remove All", () => {
    const kioskService = new KioskService()
    kioskService.add(new Americano())
    kioskService.add(new Americano())
    expect(kioskService.repo.length).toBe(2)

    kioskService.removeAll()
    expect(kioskService.repo.length).toBe(0)
  })

  it("Add Multiple Beverage", () => {
    const kioskService = new KioskService()
    const americano = new Americano()

    kioskService.add(americano, 2)
    expect(kioskService.repo[0]).toBe(americano)
    expect(kioskService.repo[1]).toBe(americano)
  })

  it("Add Zero Beverage", () => {
    const kioskService = new KioskService()
    const americano = new Americano()
      
    expect(() => kioskService.add(americano, 0))
      .toThrow(new IllegalArgumentException())
  })

  it("create order", () => {
    const kioskService = new KioskService()
    const americano = new Americano()

    kioskService.add(americano, 1)
    const order = kioskService.createOrder(dayjs().hour(13))

    expect(order.beverages.length).toBe(1)
    expect(order.beverages[0].getName()).toBe("Americano")
  })

  it("fail to create order when out of date limit", () => {
    const kioskService = new KioskService()
    const americano = new Americano()

    kioskService.add(americano, 1)

    // before open time
    expect(() => kioskService.createOrder(dayjs().hour(9)))
      .toThrow(new IllegalArgumentException())

    // after close time
    expect(() => kioskService.createOrder(dayjs().hour(23)))
      .toThrow(new IllegalArgumentException())
  })
})