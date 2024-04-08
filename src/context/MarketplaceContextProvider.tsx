import React, { createContext, useContext, useReducer } from "react"
import { isNotNil } from "utils/nil"

interface MarketplaceContextProviderProps {
  children: React.ReactNode
}

export interface Product {
  id: number
  name: string
  price: number
  vendor_id: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface MarketplaceState {
  cart: CartItem[]
}

type Action =
  | { type: "SET_CART"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }

type Dispatch = (action: Action) => void

const isCartItem = (obj: unknown): obj is CartItem =>
  isNotNil(obj) &&
  typeof obj === "object" &&
  "id" in obj &&
  typeof obj.id === "number" &&
  "name" in obj &&
  typeof obj.name === "string" &&
  "price" in obj &&
  typeof obj.price === "number" &&
  "vendor_id" in obj &&
  typeof obj.vendor_id === "number"

const validateCartItems = (items: unknown[]): items is CartItem[] =>
  Array.isArray(items) && items.every(isCartItem)

const MarketplaceStateContext = createContext<MarketplaceState>({
  cart: [],
} as MarketplaceState)

const MarketplaceDispatchContext = createContext<Dispatch>(() => null)

export const useMarketplaceState = () => {
  return useContext(MarketplaceStateContext)
}

export const useMarketplaceDispatch = () => {
  return useContext(MarketplaceDispatchContext)
}

// Necessary in order to use sessionStorage at build time
const isSSR = typeof window === "undefined"

const existingCart: CartItem[] = !isSSR
  ? JSON.parse(sessionStorage.getItem("cart") || "[]")
  : []

const isCartValid = validateCartItems(existingCart)

const cart = isCartValid ? existingCart : []

if (!isCartValid) {
  console.error(
    "Invalid cart items found in session storage. Cart will be reset."
  )
  sessionStorage.removeItem("cart")
}

const initialState: MarketplaceState = {
  cart,
}

const reducer = (state: MarketplaceState, action: Action): MarketplaceState => {
  switch (action.type) {
    case "SET_CART": {
      const existingCartItem = state?.cart?.find(
        item => item.id === action.payload.id
      )
      let newCart

      if (existingCartItem) {
        newCart = state?.cart?.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        if (Array.isArray(state.cart)) {
          newCart = [...state.cart, { ...action.payload, quantity: 1 }]
        } else {
          newCart = [{ ...action.payload, quantity: 1 }]
        }
      }

      !isSSR && sessionStorage.setItem("cart", JSON.stringify(newCart))
      return {
        ...state,
        cart: newCart,
      }
    }
    case "REMOVE_ITEM": {
      const newCart = state.cart.filter(item => item.id !== action.payload)
      !isSSR && sessionStorage.setItem("cart", JSON.stringify(newCart))
      return {
        ...state,
        cart: newCart,
      }
    }
    case "CLEAR_CART": {
      !isSSR && sessionStorage.removeItem("cart")
      return {
        ...state,
        cart: [],
      }
    }
  }
}

const MarketplaceContextProvider: React.FC<MarketplaceContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MarketplaceStateContext.Provider value={state}>
      <MarketplaceDispatchContext.Provider value={dispatch}>
        {children}
      </MarketplaceDispatchContext.Provider>
    </MarketplaceStateContext.Provider>
  )
}

export default MarketplaceContextProvider
