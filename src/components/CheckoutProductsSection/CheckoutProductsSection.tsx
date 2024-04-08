import { Flex, Text } from "components"
import {
  CartItem,
  useMarketplaceDispatch,
  useMarketplaceState,
} from "context/MarketplaceContextProvider"
import { DeliveryAddress } from "pages/checkout"
import { Fees } from "types/Fees"
import { pricify } from "utils"
import { CartItemRow } from "./CartItemRow"
import { isNotNil } from "utils/nil"

export interface CartItemWithAddress extends CartItem {
  addressId?: number
}

interface Props {
  deliveryAddresses?: DeliveryAddress[]
  cartItems: CartItemWithAddress[]
  onSelectAddress: (id: number, addressId: number) => void
  fees?: Fees
}

const CheckoutProductsSection = ({
  deliveryAddresses = [],
  cartItems,
  onSelectAddress,
  fees,
}: Props) => {
  const state = useMarketplaceState()
  const dispatch = useMarketplaceDispatch()

  const totalQuantity = state.cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const feesTotal = fees
    ? fees.standard_delivery + fees.service_fee + fees.processing_fee
    : 0

  const cartTotal =
    state.cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    ) + feesTotal

  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  return (
    <Flex
      width="100%"
      minWidth="0"
      border="1px solid #334155"
      background="#1e293b"
      gap="16px"
      borderRadius="8px"
      column
      padding="8px"
      flex="1"
    >
      <Text>{`Your Cart (${totalQuantity})`}</Text>
      {totalQuantity === 0 && <Text>Your cart is empty</Text>}

      {cartItems.map((product, idx) => (
        <CartItemRow
          key={idx}
          product={product}
          deliveryAddresses={deliveryAddresses}
          onSelectAddress={onSelectAddress}
          onRemoveItem={handleRemoveItem}
        />
      ))}

      {isNotNil(fees) && (
        <Flex
          column
          gap="4px"
          width="100%"
          padding="0 0 16px"
          borderBottom="solid 1px #64748b"
        >
          <Flex justify="space-between" width="100%">
            <Text>Delivery fee</Text>
            <Text>{pricify(fees.standard_delivery)}</Text>
          </Flex>

          <Flex justify="space-between" width="100%">
            <Text>Service fee</Text>
            <Text>{pricify(fees.service_fee)}</Text>
          </Flex>

          <Flex justify="space-between" width="100%">
            <Text>Processing fee</Text>
            <Text>{pricify(fees.processing_fee)}</Text>
          </Flex>
        </Flex>
      )}

      <Flex width="100%" justify="end">
        <Text>{` Total: ${pricify(cartTotal)}`}</Text>
      </Flex>
    </Flex>
  )
}

export default CheckoutProductsSection
