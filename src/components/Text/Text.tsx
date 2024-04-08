import React from "react"
import styled from "@emotion/styled"
import { mediaQueries } from "utils"
import { colors } from "consts"

export type TextProps = {
  display?: string
  color?: keyof typeof colors
  transform?: string
  opacity?: string
  weight?: string
  fontStyle?: string
  line?: string
  padding?: string
  margin?: string
  size?: string
  fontFamily?: string
  width?: string
  height?: string
  children?: React.ReactNode
  decoration?: string
  className?: string
  onClick?: () => void
  vertical?: string
  textAlign?: string
  visibility?: string
  letterSpacing?: string
  textTransform?: string
  whiteSpace?: string
  marginTop?: string
  marginBottom?: string
  maxWidth?: string
  cursor?: string
  border?: string
  borderBottom?: string
  alignSelf?: string
  kind?: string
  userSelect?: string
}

const Title = styled.h1<TextProps>`
  display: ${({ display }) => display};
  color: ${({ color }) => (color !== undefined && colors[color]) || color};
  font-size: 32px;
  font-weight: bold;
  line-height: 48px;
  margin: ${({ margin }) => margin};
  &.serif {
    font-family: "PT Serif", serif;
  }
  &.manrope {
    font-family: "Manrope", sans-serif;
  }
`

const Body = styled.div<TextProps>`
  /* Custom attribute declarations */
  display: ${({ display }) => display};
  color: ${({ color }) => (color !== undefined && colors[color]) || color};
  text-transform: ${({ transform }) => transform};
  opacity: ${({ opacity }) => opacity};
  font-weight: ${({ weight }) => weight};
  font-style: ${({ fontStyle }) => fontStyle};
  line-height: ${({ line = "1.4" }) => line};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  font-size: ${({ size }) => size};
  font-family: ${({ fontFamily }) => fontFamily};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  text-decoration: ${({ decoration }) => decoration};
  vertical-align: ${({ vertical }) => vertical};
  text-align: ${({ textAlign }) => textAlign};
  visibility: ${({ visibility }) => visibility};
  max-width: ${({ maxWidth }) => maxWidth};
  cursor: ${({ cursor }) => cursor};
  white-space: ${({ whiteSpace }) => whiteSpace};
  border: ${({ border }) => border};
  border-bottom: ${({ borderBottom }) => borderBottom};
  align-self: ${({ alignSelf }) => alignSelf};
  user-select: ${({ userSelect }) => userSelect};

  /* Common classes */
  /* Checkout */
  &.f1 {
    color: ${colors.white};
    font-size: 32px;
    ${mediaQueries("phonePlus")} {
      font-size: 36px;
    }
  }

  &.f15 {
    font-size: 24px;
    ${mediaQueries("phonePlus")} {
      font-size: 30px;
    }
  }

  &.f2 {
    color: ${colors.white};
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 30px;
  }

  &.f3 {
    font-size: 18px;
  }

  &.f4 {
    font-size: 16px;
  }

  &.f5 {
    font-size: 14px;
  }

  &.f6 {
    font-size: 12px;
  }

  &.f7 {
    font-size: 10px;
  }

  /* Common weight and style classes */

  &.b {
    font-weight: bold;
  }
  &.light {
    color: ${colors.gray73};
  }
  &.gold {
    color: ${colors.gold200};
  }
  &.green {
    color: ${colors.green400};
  }
  &.blue {
    color: ${colors.blue200};
  }
  &.blue-gray {
    color: ${colors.bluegray100};
  }
  &.error {
    color: ${colors.error};
  }
  &.cobalt {
    color: ${colors.blue400};
  }
  &.active {
    color: ${colors.green100};
    font-weight: 600;
  }

  &.form-error {
    color: ${colors.error};
    margin-top: ${({ marginTop = "-2rem" }) => marginTop};
    margin-bottom: ${({ marginBottom = "2rem" }) => marginBottom};
    font-size: 14px;
    font-weight: bold;
    align-self: flex-start;
  }
  &.pointer {
    cursor: pointer;
  }

  &.capitalize {
    text-transform: lowercase;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &.all-caps {
    text-transform: uppercase;
  }

  /* Alignment classes */
  &.center {
    text-align: center;
  }
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  &.italic {
    font-style: italic;
  }
  &.serif {
    font-family: "PT Serif", serif;
  }
  &.manrope {
    font-family: "Manrope", sans-serif;
  }
  &.inline {
    display: inline;
  }

  &.inter {
    font-family: "Inter", sans-serif;
  }

  &.playfair {
    font-family: "Playfair Display", serif;
  }

  &.printHide {
    @media print {
      display: none;
    }
  }

  &.bullet {
    &:before {
      content: "|";
      margin: 0 16px;
    }
  }

  &.ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.twoLineEllipsis {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  &.link {
    text-decoration: underline;
  }
`
const Text = ({ kind = "", className = "", ...props }) =>
  kind === "h1" ? (
    <Title className={`${kind} ${className}`} {...props}>
      {props.children}
    </Title>
  ) : (
    <Body className={`${kind} ${className}`} {...props}>
      {props.children}
    </Body>
  )

export default Text
