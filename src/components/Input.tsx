import { ChangeEvent } from "react"
import Flex from "./Flex"
import styled from "@emotion/styled"

export interface InputProps {
  label: string
  value: string
  onChange: (val: string) => void
  maxLength?: number
  optional?: boolean
  width?: string
  isInvalid?: boolean
  invalidMessage?: string
  inputMode?: "numeric"
  pattern?: string
}

interface Props extends InputProps {
  type: "text" | "number"
}

type InputType = {
  isInvalid: boolean
}

const StyledLabel = styled.label`
  font-size: 14px;
  color: #d1d5db;
`

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #475569;
  background-color: #334155;
  ${({ isInvalid }: InputType) => (isInvalid ? "red" : "#9ca3af")};
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);
`

const StyledOptionalText = styled.span`
  color: #ffffff99;
  font-size: 12px;
`

const StyledInvalidMessage = styled.span`
  color: red;
  font-size: 12px;
`

export const Input = ({
  type,
  label,
  value,
  onChange,
  maxLength,
  width,
  optional = false,
  isInvalid = false,
  invalidMessage,
  inputMode,
  pattern,
}: Props) => {
  const invalidText = invalidMessage || `${label} is invalid`

  return (
    <Flex column gap="4px" align="stretch" minWidth="0" width={width}>
      <StyledLabel>
        {label}
        {optional ? <StyledOptionalText> (optional)</StyledOptionalText> : null}
      </StyledLabel>

      <StyledInput
        maxLength={maxLength}
        required={!optional}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        isInvalid={isInvalid}
        inputMode={inputMode}
        pattern={pattern}
      />

      {isInvalid && <StyledInvalidMessage>{invalidText}</StyledInvalidMessage>}
    </Flex>
  )
}
