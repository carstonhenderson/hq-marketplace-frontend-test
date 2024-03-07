import { Button, Flex, Text } from "components"
import {
  CartItem,
  useMarketplaceDispatch,
  useMarketplaceState,
} from "context/MarketplaceContextProvider"
import { BiTrash } from "react-icons/bi"
import { pricify } from "utils"

const CheckoutProductsSection: React.FC = () => {
  // ============================== HOOKS ===================================
  const state = useMarketplaceState()
  const dispatch = useMarketplaceDispatch()

  // ============================== VARIABLES ===================================

  const totalQuantity = state?.cart?.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const cartTotal =
    state?.cart?.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    ) ?? 0

  // ============================== FUNCTIONS ===============================
  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  // ============================== RENDER ===============================

  return (
    <Flex
      width="100%"
      border="2px solid gray"
      gap="16px"
      borderRadius="8px"
      column
      padding="8px"
    >
      <Text>{`Your Cart (${totalQuantity})`}</Text>
      {state?.cart.map((product: CartItem, index: number) => (
        <Flex
          key={index}
          justify="space-between"
          align="center"
          margin="4px"
          padding="16px"
          width="100%"
        >
          <Text>
            {product.name} x {product.quantity}
          </Text>
          <Button onClick={() => handleRemoveItem(product.id)} variant="ghost">
            <BiTrash />
          </Button>
        </Flex>
      ))}

      <Flex>
        <Text>{` Total: $${pricify(cartTotal)}`}</Text>
      </Flex>
    </Flex>
  )
}

export default CheckoutProductsSection
