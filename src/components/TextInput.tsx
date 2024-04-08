import { Input, InputProps } from "./Input"

export const TextInput = ({
  label,
  value,
  onChange,
  maxLength,
  width,
  optional = false,
  isInvalid = false,
}: InputProps) => (
  <Input
    type="text"
    label={label}
    value={value}
    width={width}
    onChange={onChange}
    maxLength={maxLength}
    optional={optional}
    isInvalid={isInvalid}
  />
)
