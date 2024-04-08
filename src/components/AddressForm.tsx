import { DeliveryAddress } from "pages/checkout"
import { FormEvent, useState } from "react"
import { TextInput } from "./TextInput"
import Button from "./Button"
import Flex from "./Flex"
import { isEmpty, isPresent } from "utils/nil"
import { NumberInput } from "./NumberInput"
import { compact } from "utils/compact"
import { match } from "ts-pattern"

interface Props {
  address?: DeliveryAddress
  onSave: (address: DeliveryAddress, id?: number) => void
  onCancel?: () => void
  onRemove?: (id: number) => void
  canCancel?: boolean
}

const blankAddress: DeliveryAddress = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
}

const isBlankAddress = (address: DeliveryAddress) =>
  Object.values(address).every(val => !val)

type InputKey =
  | "name"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "state"
  | "zipCode"
  | "country"

export const AddressForm = ({
  address = blankAddress,
  onSave,
  onCancel,
  onRemove,
}: Props) => {
  const [name, setName] = useState(address.name)
  const [addressLine1, setAddressLine1] = useState(address.addressLine1)
  const [addressLine2, setAddressLine2] = useState(address.addressLine2)
  const [city, setCity] = useState(address.city)
  const [state, setState] = useState(address.state)
  const [zipCode, setZipCode] = useState(address.zipCode)
  const [country, setCountry] = useState(address.country)

  const [isEditing, setIsEditing] = useState(isBlankAddress(address))
  const [invalid, setInvalid] = useState<string[]>([])

  const handleCancel = () => {
    onCancel?.()

    setIsEditing(false)

    setName(address.name)
    setAddressLine1(address.addressLine1)
    setAddressLine2(address.addressLine2)
    setCity(address.city)
    setState(address.state)
    setZipCode(address.zipCode)
    setCountry(address.country)
  }

  const handleRemove = () => {
    onRemove?.(address.id!)
  }

  const invalidList: InputKey[] = compact([
    isEmpty(name) && "name",
    isEmpty(addressLine1) && "addressLine1",
    isEmpty(city) && "city",
    isEmpty(state) && "state",
    (isEmpty(zipCode) || zipCode.length !== 5 || zipCode.match(/\D/)) &&
      "zipCode",
    isEmpty(country) && "country",
  ])

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    setInvalid(invalidList)

    if (isEmpty(invalidList)) {
      setIsEditing(false)

      onSave(
        {
          name,
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
          country,
        },
        address.id
      )
    }
  }

  const canRemove = isPresent(onRemove)

  const handleChange = (key: InputKey, value: string) => {
    setInvalid(prev => prev.filter(val => val !== key))

    match(key)
      .with("name", () => setName(value))
      .with("addressLine1", () => setAddressLine1(value))
      .with("addressLine2", () => setAddressLine2(value))
      .with("city", () => setCity(value))
      .with("state", () => setState(value))
      .with("zipCode", () => setZipCode(value))
      .with("country", () => setCountry(value))
      .exhaustive()
  }

  return (
    <Flex
      column
      gap="16px"
      width="100%"
      borderBottom="solid 1px #64748b"
      padding="0 0 16px"
      align="stretch"
    >
      {isEditing && (
        <>
          <TextInput
            label="Name"
            value={name}
            onChange={val => handleChange("name", val)}
            width="100%"
            isInvalid={invalid.includes("name")}
          />

          <TextInput
            label="Address line 1"
            value={addressLine1}
            onChange={val => handleChange("addressLine1", val)}
            isInvalid={invalid.includes("addressLine1")}
          />

          <TextInput
            optional
            label="Address line 2"
            value={addressLine2 || ""}
            onChange={val => handleChange("addressLine2", val)}
          />

          <Flex gap="16px">
            <TextInput
              label="City"
              value={city}
              onChange={val => handleChange("city", val)}
              isInvalid={invalid.includes("city")}
            />

            <TextInput
              label="State"
              value={state}
              onChange={val => handleChange("state", val)}
              isInvalid={invalid.includes("state")}
            />

            <NumberInput
              label="Zip code"
              value={zipCode}
              onChange={val => handleChange("zipCode", val)}
              maxLength={5}
              isInvalid={invalid.includes("zipCode")}
            />
          </Flex>

          <TextInput
            label="Country"
            value={country}
            onChange={val => handleChange("country", val)}
            isInvalid={invalid.includes("country")}
          />

          <Flex gap="16px" justify="end">
            {canRemove && <Button onClick={handleRemove}>Remove</Button>}

            {isPresent(onCancel) && (
              <Button onClick={handleCancel}>Cancel</Button>
            )}

            <Button
              alignSelf="end"
              onClick={handleSubmit}
              disabled={!isEmpty(invalidList)}
              className="primary"
            >
              Save
            </Button>
          </Flex>
        </>
      )}

      {!isEditing && (
        <Flex justify="space-between" width="100%">
          <Flex column gap="4px" align="start">
            <span>{name}</span>
            <span>{addressLine1}</span>
            {isPresent(addressLine2) && <span>{addressLine2}</span>}
            <span>{`${city}, ${state} ${zipCode}`}</span>
            <span>{country}</span>
          </Flex>

          <Button onClick={() => setIsEditing(true)} className="primary">
            Edit
          </Button>
        </Flex>
      )}
    </Flex>
  )
}
