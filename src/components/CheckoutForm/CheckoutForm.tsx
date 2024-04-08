import React, { useState } from "react"
import { Flex, Button, Text } from "components"
import { AddressForm } from "components/AddressForm"
import { DeliveryAddress } from "pages/checkout"
import { isEmpty } from "utils/nil"
import { useMarketplaceState } from "context/MarketplaceContextProvider"
import { TextInput } from "components/TextInput"

interface CheckoutFormProps {
  onSubmit: () => void
  onSaveAddress: (address: DeliveryAddress, id?: number) => void
  onRemoveAddress: (id: number) => void
  deliveryAddresses: DeliveryAddress[]
  isSubmitting: boolean
  customerName: string
  onCustomerNameChange: (name: string) => void
  isSubmittable: boolean
}

const CheckoutForm = ({
  onSubmit,
  onSaveAddress,
  onRemoveAddress,
  deliveryAddresses,
  isSubmitting,
  customerName,
  onCustomerNameChange: setCustomerName,
  isSubmittable,
}: CheckoutFormProps) => {
  const state = useMarketplaceState()

  const [newAddress, setNewAddress] = useState(isEmpty(deliveryAddresses))

  const totalQuantity = state.cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const handleSaveAddress = (address: DeliveryAddress, id?: number) => {
    setNewAddress(false)
    onSaveAddress(address, id)
  }

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      border="1px solid #334155"
      gap="24px"
      borderRadius="8px"
      column
      align="stretch"
      padding="16px"
      minWidth="0"
      flex="1"
      background="#1e293b"
    >
      <Flex padding="0 0 16px" borderBottom="solid 1px #64748b">
        <TextInput
          label="Customer name"
          value={customerName}
          onChange={setCustomerName}
          width="100%"
        />
      </Flex>

      <Text>Delivery addresses</Text>

      {deliveryAddresses.map(address => (
        <AddressForm
          key={address.addressLine1 + address.addressLine2}
          address={address}
          onSave={onSaveAddress}
          onCancel={() => setNewAddress(false)}
          onRemove={onRemoveAddress}
        />
      ))}

      {newAddress && (
        <AddressForm
          onSave={handleSaveAddress}
          onCancel={
            isEmpty(deliveryAddresses) ? undefined : () => setNewAddress(false)
          }
        />
      )}

      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          setNewAddress(true)
        }}
        alignSelf="end"
        disabled={newAddress}
        className="transparent"
      >
        Add new address
      </Button>

      <Button
        type="submit"
        alignSelf="end"
        disabled={!isSubmittable}
        className="primary"
      >
        {isSubmitting ? "Placing order..." : "Place order"}
      </Button>
    </Flex>
  )
}

export default CheckoutForm
