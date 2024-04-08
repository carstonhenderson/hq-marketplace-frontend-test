import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import {
  useMarketplaceState,
  useMarketplaceDispatch,
} from "context/MarketplaceContextProvider"
import { Flex, Text, Button } from "components"
import { FaTrash } from "react-icons/fa"
import styled from "@emotion/styled"

export interface CarPopOverProps {
  open: boolean
  onClose: () => void
}

const StyledWarningMessageCard = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: #fefce8;
  color: #854d0e;
  font-size: 14px;
`

const CartPopover: React.FC<CarPopOverProps> = ({ open, onClose }) => {
  const dispatch = useMarketplaceDispatch()
  const state = useMarketplaceState()
  const router = useRouter()

  const popoverRef = useRef<HTMLDivElement>(null)

  const checkout = () => {
    router.push("/checkout")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const totalQuantity = state.cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  return (
    <Flex
      ref={popoverRef}
      column
      position="absolute"
      top="1em"
      right="1em"
      width="300px"
      background="#1e293b"
      border="1px solid #334155"
      padding="1em"
      display={open ? "flex" : "none"}
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.2)"
      borderRadius="8px"
      gap="32px"
      align="stretch"
    >
      <Text kind="f2">Your Cart</Text>

      {totalQuantity < 2 && (
        <StyledWarningMessageCard>
          <Text>You need 2 or more items in your cart to check out</Text>
        </StyledWarningMessageCard>
      )}

      <Flex column gap="16px" align="stretch">
        {state.cart.map((item, index) => (
          <Flex key={`${item.id} - ${index}`} justify="space-between">
            <p>{`${item.name} x${item.quantity}`}</p>
            <Button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
              className="transparent"
            >
              <FaTrash />
            </Button>
          </Flex>
        ))}
      </Flex>

      <Flex gap="16px" justify="flex-end">
        <Button
          onClick={checkout}
          disabled={totalQuantity < 2}
          className="primary"
        >
          Checkout
        </Button>
      </Flex>
    </Flex>
  )
}

export default CartPopover
