import React from "react"
import styled from "@emotion/styled"
import { colors } from "consts"

type ButtonType = {
  display?: string
  flexDirection?: "column" | "row"
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
  background?: string
  shadow?: string
  border?: string
  borderRadius?: string
  position?: "absolute" | "fixed" | "relative" | "sticky"
  zIndex?: string
  cursor?:
    | "pointer"
    | "not-allowed"
    | "help"
    | "auto"
    | "initial"
    | "inherit"
    | "unset"
  /** If present it sets the "justify-content" flexbox property--accepts standard flexbox values such as "space-around" */
  justify?: string
  /** If present it sets the "align-items" flexbox property--accepts standard flexbox values such as "flex-start" */
  align?: string
  /** If present it sets the width of the element; takes any CSS width value (pixels, percentage, etc.) */
  width?: string
  /** If present it sets the padding of the element; takes any CSS padding value (pixels, EMs, etc.) */
  padding?: string
  /** If present it sets the margin of the element; takes any CSS margin value (pixels, EMs, etc.) */
  margin?: string
  /** If present it sets the maxWidth of the element; takes any CSS maxWidth value (pixels, percentage, etc.) */
  maxWidth?: string
  /** If present it sets the minWidth of the element; takes any CSS minWidth value (pixels, percentage, etc.) */
  minWidth?: string
  /** The top property affects the vertical position of a positioned element. Used in conjuction iwth position property.**/
  top?: string
  /** The bottom property affects the vertical position of a positioned element. Used in conjuction iwth position property.**/
  bottom?: string
  /** The left property affects the horizontal position of a positioned element. Used in conjuction iwth position property.**/
  left?: string
  /** The right property affects the horizontal position of a positioned element. Used in conjuction iwth position property.**/
  right?: string
  size?: string
  textAlign?: string
  line?: string
  condolence?: boolean
}

export const MainButton = styled.button<ButtonType>`
  display: ${({ display = "inline-block" }) => display};
  align-items: ${({ align = "center" }) => align};
  align-self: ${({ alignSelf = "auto" }) => alignSelf};
  justify-content: ${({ justify = "space-between" }) => justify};
  text-decoration: none;
  border: ${({ border }) => (border ? border : "none")};
  width: ${({ width }) => width};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  border-radius: ${({ borderRadius = "5px" }) => borderRadius};
  cursor: ${({ cursor = "pointer" }) => cursor};
  padding: ${({ padding = "8px 16px" }) => padding};
  font-size: ${({ size }) => size};
  text-align: ${({ textAlign = "center" }) => textAlign};
  line-height: ${({ line = "1em" }) => line};
  opacity: 1;
  transition-duration: 0.3s;
  margin: ${({ margin }) => margin};
  background: ${({ background }) => background};
  box-shadow: ${({ shadow }) =>
    shadow ? shadow : `0 4px 4px -2px rgba(0, 20, 30, 0.3)`};
  color: ${({ color }) => color};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  z-index: ${({ zIndex }) => zIndex};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
    &:hover {
      opacity: 0.5;
    }
  }

  &:focus {
    outline: none;
  }
  &:hover {
    opacity: 0.8;
    &:disabled {
      opacity: 0.5;
    }
  }
  &.opaque {
    opacity: 1;
  }
  &.hide {
    display: none;
  }

  &.back-button {
    padding: 4px 12px !important;
  }

  &.primary {
    background-color: #64748b;
    border: 1px solid #ffffff25;
    color: white;
  }

  &.blue {
    background-color: ${colors.blue};
    color: white;
  }
  &.black {
    background-color: ${colors.black};
    color: white;
  }
  &.red {
    background-color: ${colors.red};
    color: white;
  }
  &.shadow {
    box-shadow: 0 4px 4px -2px rgba(0, 20, 30, 0.2);
  }

  &.b {
    font-weight: bold;
  }
  &.outline {
    background: ${({ background = "none" }) => background};
    color: ${colors.gray};
    border: 1px solid ${colors.grayLight};
    &.default {
      background: ${colors.grayLight};
      border: none;
    }
    &.white {
      color: ${colors.white};
      border: 1px solid ${colors.white};
    }
    &.black {
      color: ${colors.grayLightest};
      border: 1px solid ${colors.grayLightest};
    }
  }
  &.absolute {
    position: absolute;
    top: 8px;
    left: 12px;
  }
  &.transparent {
    background: transparent;
    box-shadow: none;
    &:hover {
      background-color: #64748b50;
    }
  }
  &.link {
    background: transparent;
    box-shadow: none;
    text-decoration: underline;
    &:hover {
      color: ${colors.silver};
    }
  }
  &.emoji {
    box-shadow: none;
    background: transparent;
    border-radius: 50%;
    border: 1px solid transparent;
    padding: 16px;
    &:hover {
      border: 1px solid ${colors.gray};
    }
  }

  &.printHide {
    @media print {
      display: none;
    }
  }
`

const Button = ({ kind = "", ...props }) => (
  <MainButton className={kind} {...props} />
)

export default Button
