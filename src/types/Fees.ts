export class Fees {
  id: number
  vendor_id: string
  standard_delivery: number
  processing_fee: number
  service_fee: number

  constructor(obj: {
    id: number
    vendor_id: string
    standard_delivery: number
    processing_fee: number
    service_fee: number
  }) {
    this.id = obj.id
    this.vendor_id = obj.vendor_id
    this.standard_delivery = obj.standard_delivery
    this.processing_fee = obj.processing_fee
    this.service_fee = obj.service_fee
  }
}
