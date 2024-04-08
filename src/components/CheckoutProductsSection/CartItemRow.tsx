import { Button, Flex, Text } from "components"
import { Option, SelectInput } from "components/SelectInput"
import { DeliveryAddress } from "pages/checkout"
import { pricify } from "utils"
import { CartItemWithAddress } from "./CheckoutProductsSection"
import { isNotNil } from "utils/nil"
import { FaTrash } from "react-icons/fa"

interface Props {
  product: CartItemWithAddress
  deliveryAddresses: DeliveryAddress[]
  onSelectAddress: (id: number, addressId: number) => void
  onRemoveItem: (id: number) => void
}

export const CartItemRow = ({
  product,
  deliveryAddresses,
  onSelectAddress,
  onRemoveItem,
}: Props) => {
  const getSelectedAddress = (id: number) =>
    deliveryAddresses.find(address => address.id === id)!

  const toOption = (address: DeliveryAddress) =>
    ({
      value: address.id ?? 0,
      displayValue: `${address.addressLine1} ${address.addressLine2}`,
    } as Option)

  return (
    <Flex
      column
      gap="8px"
      width="100%"
      padding="0 0 16px"
      borderBottom="solid 1px #64748b"
    >
      <Flex justify="space-between" align="stretch" width="100%">
        <Flex column gap="16px" align="start">
          <Text>
            {product.name} x {product.quantity}
          </Text>

          <SelectInput
            label="Delivery address"
            selectedOption={
              isNotNil(product.addressId)
                ? toOption(getSelectedAddress(product.addressId))
                : undefined
            }
            onChange={(val: string) =>
              onSelectAddress(product.id, parseInt(val))
            }
            options={deliveryAddresses.map((address, idx) => ({
              value: address.id ?? idx,
              displayValue: `${address.addressLine1} ${address.addressLine2}`,
            }))}
            width="164px"
          />
        </Flex>

        <Flex column gap="8px" justify="space-between" align="end">
          <Button
            onClick={() => onRemoveItem(product.id)}
            className="transparent"
          >
            <FaTrash />
          </Button>

          <Text>{pricify(product.price * product.quantity)}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
