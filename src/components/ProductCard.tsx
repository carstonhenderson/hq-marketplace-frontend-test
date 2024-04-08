import {
  Product,
  useMarketplaceDispatch,
} from "context/MarketplaceContextProvider"
import Flex from "./Flex"
import Text from "./Text"
import Button from "./Button"
import { pricify } from "utils"
import toast from "react-hot-toast"

export const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useMarketplaceDispatch()
  const addToCart = () => {
    dispatch({ type: "SET_CART", payload: product })
    toast.success("Added to cart")
  }

  return (
    <Flex
      column
      padding="16px"
      border="1px solid #475569"
      borderRadius="8px"
      gap="32px"
      background="#334155"
      align="start"
      width="240px"
      height="196px"
    >
      <Text size="20px" weight="bold">
        {product.name}
      </Text>

      <Flex justify="space-between" gap="8px" width="100%">
        <Text size="16px">{pricify(product.price)}</Text>
        <Button onClick={addToCart} className="primary">
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  )
}
