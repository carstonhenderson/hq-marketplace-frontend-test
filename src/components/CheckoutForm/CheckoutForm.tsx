// components/CheckoutForm.tsx
import React from "react"
import { useForm } from "react-hook-form"
import { Flex, Input, Button } from "components"

type FormData = {
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address_line1: string
  delivery_address_line2: string
  delivery_address_city: string
  delivery_address_state: string
  delivery_address_country: string
  delivery_address_zipcode: string
}

interface CheckoutFormProps {
  onSubmit: (data: FormData) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <Flex
      as="form"
      border="2px solid gray"
      borderRadius="8px"
      column
      maxWidth="600px"
      onSubmit={handleSubmit(onSubmit)}
      padding="16px"
      width="100%"
    >
      <Input
        placeholder="Customer Name"
        {...register("customer_name", { required: "This is required." })}
      />
      {errors.customer_name && <p>{errors.customer_name.message}</p>}

      <Button type="submit"> {`Place Order`} </Button>
    </Flex>
  )
}

export default CheckoutForm
