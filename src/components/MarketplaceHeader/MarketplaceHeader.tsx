import React, { useState } from "react"
import { FiShoppingCart } from "react-icons/fi"
import { CartPopover, Flex, Text } from "components"
import { useMarketplaceState } from "context/MarketplaceContextProvider"

const MarketplaceHeader: React.FC = () => {
  // ============================== HOOKS ===================================
  const state = useMarketplaceState()

  // ============================== STATES ===================================
  const [isCartPopoverOpen, setIsCartPopoverOpen] = useState(false)

  // ============================== FUNCTIONS ===============================
  const handleCartIconClick = () => {
    setIsCartPopoverOpen(prevState => !prevState)
  }

  // ============================== RENDER ===============================
  return (
    <Flex
      position="relative"
      justify="space-between"
      align="center"
      width="100%"
      padding="8px"
      borderBottom="1px solid #475569"
    >
      <Flex column align="flex-start" justify="flex-start" padding="0 16px">
        <Text kind="h1" margin="0" padding="0">
          {`HQ Marketplace`}
        </Text>
        <Text kind="f3">{`Welcome to the HQ Marketplace!`}</Text>
      </Flex>
      <Flex position="relative" margin="0 16px">
        <Text kind="f1 pointer">
          <FiShoppingCart onClick={handleCartIconClick} color="white" />
        </Text>
        <Flex
          position="absolute"
          top="90"
          right="90"
          border="1px solid white"
          background="white"
          borderRadius="50%"
          padding="2px 6px"
        >
          <Text kind="f7" color="black">
            {state?.cart?.reduce(
              (total, product) => total + product.quantity,
              0
            )}
          </Text>
        </Flex>
      </Flex>
      <CartPopover
        open={isCartPopoverOpen}
        onClose={() => setIsCartPopoverOpen(false)}
      />
    </Flex>
  )
}

export default MarketplaceHeader
