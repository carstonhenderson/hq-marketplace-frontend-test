import React from "react"
import { Flex, Text } from "components"
import { ProductCard } from "components/ProductCard"
import dynamic from "next/dynamic"
import { useFetch } from "hooks/useFetch"
import { vendorId } from "consts/paths"
import { Product } from "types/Product"

const MarketplaceHeader = dynamic(
  () => import("components/MarketplaceHeader"),
  { ssr: false }
)

const Home = () => {
  const {
    response: products = [],
    isLoading,
    isErrored,
    refetch,
  } = useFetch<Product[]>(`vendors/${vendorId}/products`, Product)

  return (
    <Flex column>
      <MarketplaceHeader />

      <Flex
        gap="16px"
        margin="32px 16px 0"
        flexWrap="wrap"
        justify="start"
        maxWidth="1080px"
        width="100%"
        padding="0 16px"
      >
        {isLoading && <p>Getting products...</p>}
        {isErrored && (
          <>
            <Text size="lg" weight="bold">
              Something went wrong.
            </Text>
            <button onClick={refetch}>Try again</button>
          </>
        )}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 240px)",
            gridGap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Flex>
    </Flex>
  )
}

export default Home
