import { Input, InputProps } from "./Input"

export const NumberInput = ({
  label,
  value,
  onChange,
  optional = false,
  isInvalid = false,
  maxLength,
}: InputProps) => {
  const handleChange = (value: string) => {
    onChange(value.replace(/\D/g, ""))
  }

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      label={label}
      value={value}
      onChange={handleChange}
      optional={optional}
      isInvalid={isInvalid}
      maxLength={maxLength}
    />
  )
}
