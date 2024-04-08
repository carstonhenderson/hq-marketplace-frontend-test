import React, { useEffect, useState } from "react"
import {
  CheckoutForm,
  Flex,
  Text,
  CheckoutProductsSection,
  MarketplaceHeader,
} from "components"
import {
  useMarketplaceDispatch,
  useMarketplaceState,
} from "../context/MarketplaceContextProvider"
import { isEmpty, isNil, isNotNil } from "utils/nil"
import Link from "next/link"
import styled from "@emotion/styled"
import { BiErrorCircle } from "react-icons/bi"
import { CartItemWithAddress } from "components/CheckoutProductsSection/CheckoutProductsSection"
import { apiUrl, vendorId } from "consts/paths"
import { useFetch } from "hooks/useFetch"
import { Fees } from "types/Fees"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

export interface DeliveryAddress {
  id?: number
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  zipCode: string
}

const StyledErrorMessageCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  background-color: #fee2e2;
  margin-bottom: 32px;
  color: #991b1b;

  svg {
    color: #ef4444;
  }
`

const formatAddress = (address: DeliveryAddress) => ({
  delivery_address_name: address.name,
  delivery_address_line_1: address.addressLine1,
  delivery_address_line_2: address.addressLine2,
  delivery_address_city: address.city,
  delivery_address_state: address.state,
  delivery_address_zip_code: address.zipCode,
  delivery_address_country: address.country,
})

const CheckoutPage: React.FC = () => {
  const state = useMarketplaceState()
  const dispatch = useMarketplaceDispatch()
  const router = useRouter()
  const { response: fees } = useFetch(`vendors/${vendorId}/fees`, Fees)

  const [isLoading, setIsLoading] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [cartItems, setCartItems] = useState<CartItemWithAddress[]>(state.cart)
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>(
    []
  )

  // sync cart items with context (e.g. removing items from the cart)
  useEffect(() => {
    setCartItems(prev =>
      prev.filter(({ id: prevId }) =>
        state.cart.some(({ id }) => id === prevId)
      )
    )
  }, [state.cart])

  // sync delivery addresses with cart items (e.g. when an address is added or removed)
  useEffect(() => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (isNil(item.addressId)) {
          return { ...item, addressId: deliveryAddresses[0]?.id }
        }

        if (!deliveryAddresses.some(address => address.id === item.addressId)) {
          return { ...item, addressId: deliveryAddresses[0]?.id }
        }

        return item
      })
    })
  }, [deliveryAddresses])

  const placeOrder = () => {
    setIsLoading(true)

    const formattedCart = cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      vendor_id: item.vendor_id,
      price: item.price,
      delivery_address: formatAddress(
        deliveryAddresses.find(address => address.id === item.addressId)!
      ),
    }))

    fetch(`${apiUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: formattedCart,
        // customer_name: customerName,
        fees: fees,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("An error occurred while processing your order.")
        } else {
          dispatch({ type: "CLEAR_CART" })
          router.push("/thank-you")
        }
      })
      .catch(error => toast.error(error.message))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const saveAddress = (address: DeliveryAddress, id?: number) => {
    if (isNotNil(id)) {
      setDeliveryAddresses(prevAddresses =>
        prevAddresses.map((prevAddress, idx) =>
          idx === id ? address : prevAddress
        )
      )
    } else {
      setDeliveryAddresses(prevAddresses => [
        ...prevAddresses,
        { ...address, id: prevAddresses.length },
      ])
    }
  }

  const removeAddress = (id: number) => {
    setDeliveryAddresses(prevAddresses =>
      prevAddresses.filter(address => address.id !== id)
    )
  }

  const totalQuantity = state.cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const selectAddress = (id: number, addressId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, addressId } : item))
    )
  }

  const isSubmittable =
    totalQuantity > 1 &&
    !isLoading &&
    !isEmpty(customerName) &&
    cartItems.length > 1 &&
    cartItems.every(item => isNotNil(item.addressId))

  return (
    <Flex column gap="32px">
      <MarketplaceHeader />
      <Flex column width="100%" maxWidth="1080px">
        <Text kind="f1" margin="0 0 32px">
          {`Checkout`}
        </Text>

        {totalQuantity < 2 && (
          <StyledErrorMessageCard>
            <BiErrorCircle size={20} />
            <Text>You need 2 or more items in your cart to check out.</Text>
            <Link href="/">
              <Text className="link" color="blue">
                Back to Marketplace
              </Text>
            </Link>
          </StyledErrorMessageCard>
        )}

        <Flex gap="16px" width="100%" align="flex-start">
          <CheckoutForm
            onSubmit={placeOrder}
            deliveryAddresses={deliveryAddresses}
            onSaveAddress={saveAddress}
            onRemoveAddress={removeAddress}
            isSubmitting={isLoading}
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            isSubmittable={isSubmittable}
          />

          <CheckoutProductsSection
            deliveryAddresses={deliveryAddresses}
            onSelectAddress={selectAddress}
            cartItems={cartItems}
            fees={fees}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CheckoutPage
