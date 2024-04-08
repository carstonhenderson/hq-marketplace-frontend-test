export class Product {
  id: number
  name: string
  price: number
  vendor_id: number

  constructor(obj: {
    id: number
    name: string
    price: number
    vendor_id: number
  }) {
    this.id = obj.id
    this.name = obj.name
    this.price = obj.price
    this.vendor_id = obj.vendor_id
  }
}
