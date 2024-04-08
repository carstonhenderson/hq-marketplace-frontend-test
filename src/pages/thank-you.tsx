import { Button, Flex, MarketplaceHeader, Text } from "components"
import Link from "next/link"

const OrderPlacedPage = () => {
  return (
    <Flex column gap="32px">
      <MarketplaceHeader />
      <Flex column width="100%" maxWidth="1080px" gap="16px">
        <Text kind="h1">Success!</Text>
        <Text>Your order has been placed.</Text>
      </Flex>

      <Link href="/">
        <Button>Back to marketplace</Button>
      </Link>
    </Flex>
  )
}

export default OrderPlacedPage
