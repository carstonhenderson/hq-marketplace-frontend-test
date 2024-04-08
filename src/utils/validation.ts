import { CartItem } from "context/MarketplaceContextProvider"
import { isNotNil } from "./nil"

const isCartItem = (obj: unknown): obj is CartItem =>
  isNotNil(obj) &&
  typeof obj === "object" &&
  "id" in obj &&
  typeof obj.id === "number" &&
  "name" in obj &&
  typeof obj.name === "string" &&
  "price" in obj &&
  obj.price === "number" &&
  "vendor_id" in obj &&
  obj.vendor_id === "number"

const validateCartItems = (items: unknown[]): items is CartItem[] =>
  Array.isArray(items) && items.every(isCartItem)
