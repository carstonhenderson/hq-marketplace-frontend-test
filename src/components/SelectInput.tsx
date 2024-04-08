import { ChangeEvent } from "react"
import Flex from "./Flex"
import styled from "@emotion/styled"

export interface Option {
  value: string | number
  displayValue: string
}

interface Props {
  label: string
  options: Option[]
  selectedOption?: Option
  onChange: (val: string) => void
  width?: string
}

const StyledLabel = styled.label`
  font-size: 14px;
  color: #d1d5db;
`

type SelectProps = {
  width?: string
}

const StyledSelect = styled.select<SelectProps>`
appearance; none;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #475569;
  background-color: #334155;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);
  width: ${({ width }) => width};
`

export const SelectInput = ({
  label,
  options,
  selectedOption,
  onChange,
  width = "",
}: Props) => (
  <Flex column gap="4px" align="stretch" minWidth="0">
    <StyledLabel>{label}</StyledLabel>

    <StyledSelect
      width={width}
      value={selectedOption?.value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      {options.map(({ value, displayValue }) => (
        <option key={value} value={value}>
          {displayValue}
        </option>
      ))}
    </StyledSelect>
  </Flex>
)
