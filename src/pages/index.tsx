import React, { useEffect, useState, useCallback } from "react"
import { ProductCard, Flex } from "components"
import { Product } from "context/MarketplaceContextProvider"
import dynamic from "next/dynamic"

const MarketplaceHeader = dynamic(
  () => import("components/MarketplaceHeader"),
  { ssr: false }
)

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  // ============================== FUNCTIONS ===============================

  const getProducts = useCallback(async () => {
  }, [])

  // ============================== USE EFFECTS ===================================
  useEffect(() => {
    getProducts()
  }, [getProducts])

  // ============================== RENDER ===============================
  return (
    <Flex column>
      <MarketplaceHeader />
      <Flex gap="16px" margin="32px 16px 0">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Flex>
    </Flex>
  )
}

export default Home
