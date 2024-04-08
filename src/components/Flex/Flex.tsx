import styled from "@emotion/styled"

export type FlexType = {
  display?: string
  flexDirection?: "column" | "row" | "row-reverse" | "column-reverse"
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"
  fontSize?: string
  flexShrink?: string
  maxHeight?: string
  background?: string
  backgroundSize?: string
  boxShadow?: string
  border?: string
  borderBottom?: string
  borderTop?: string
  borderRadius?: string
  position?: "absolute" | "fixed" | "relative" | "sticky" | "static" | "inherit"
  visibility?: "visible" | "hidden" | "collapse" | "initial" | "inherit"
  zIndex?: string
  overflow?:
    | "visible"
    | "hidden"
    | "clip"
    | "scroll"
    | "auto"
    | "initial"
    | "inherit"
  overflowX?: "visible" | "hidden" | "scroll" | "auto" | "initial" | "inherit"
  overflowY?: "visible" | "hidden" | "scroll" | "auto" | "initial" | "inherit"
  cursor?:
    | "pointer"
    | "not-allowed"
    | "help"
    | "auto"
    | "initial"
    | "inherit"
    | "unset"
  gap?: string
  outline?: string
  column?: boolean
  /** If present it sets the "justify-content" flexbox property--accepts standard flexbox values such as "space-around" */
  justify?: string
  /** If present it sets the "align-items" flexbox property--accepts standard flexbox values such as "flex-start" */
  align?: string
  /** If flexWrap is passed, it will set the flex-wrap property to the value passed otherwise it will use the default css value "nowrap" */
  flexWrap?: string
  /** property creates a clipping region that sets what part of an element should be shown */
  clipPath?: string
  flex?: string
  /** If present it sets the flex-grow value of the element; takes string representation of number */
  flexGrow?: string
  /** If present it sets the width of the element; takes any CSS width value (pixels, percentage, etc.) */
  width?: string
  /** If present it sets the height of the element; takes any CSS height value (pixels, percentage, etc.) */
  height?: string
  /** If present it sets the padding of the element; takes any CSS padding value (pixels, EMs, etc.) */
  padding?: string
  /** If present it sets the margin of the element; takes any CSS margin value (pixels, EMs, etc.) */
  margin?: string
  /** If present it sets the maxWidth of the element; takes any CSS maxWidth value (pixels, percentage, etc.) */
  maxWidth?: string
  /** If present it sets the minWidth of the element; takes any CSS minWidth value (pixels, percentage, etc.) */
  minWidth?: string
  /** If present it sets the minHeight of the element; takes any CSS minHeight value (pixels, percentage, etc.) */
  minHeight?: string
  /** The top property affects the vertical position of a positioned element. Used in conjunction with position property.**/
  top?: string
  /** The bottom property affects the vertical position of a positioned element. Used in conjunction with position property.**/
  bottom?: string
  /** The left property affects the horizontal position of a positioned element. Used in conjunction with position property.**/
  left?: string
  /** The right property affects the horizontal position of a positioned element. Used in conjunction with position property.**/
  right?: string
  /** assigns a label to the flex component **/
  label?: string
  /** This property lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS.**/
  transform?: string
  /** This property lets you set a transition to the element.**/
  transition?: string
  /** This property lets you control whether an element is available for interaction. */
  pointerEvents?: "auto" | "none" | "initial" | "inherit"
  /** This property lets you manipulate the backdrop filter of an element. */
  backdropFilter?: string
  /**This property modifies max-height to collapse content */
  open?: boolean
  /** This property is used to set the src of an image */
  src?: string
  /** This property is used to set the alt of an image */
  alt?: string
  /** This property is used to set the href of an anchor tag if the as property is set to a.*/
  href?: string
  /** This property is used to set the value of the element. */
  value?: string
  /** This property is used to set the flex order of the child. */
  order?: string
  /** This property is used to set the opacity of the element. */
  opacity?: string
  /** This property is used to set the grid column start of the element. */
  gridColumnStart?: string
  /** This property is used to set the font family of the element to aid with inheritance. */
  fontFamily?: string
  /** react ref */
  ref?: any
  /** This property is used to set a name of the Flex component instance */
  name?: string
  /** This property is used to set the type of the element. */
  type?: string
  /** This property is used to align text for all children */
  textAlign?: string
}

export const Flex = styled.div<FlexType>`
  display: ${({ display = "flex" }) => display};
  flex-direction: ${({ column, flexDirection }) =>
    column ? "column" : flexDirection ? flexDirection : "row"};
  justify-content: ${({ justify = "space-between " }) => justify};
  align-items: ${({ align = "center" }) => align};
  align-self: ${({ alignSelf = "auto" }) => alignSelf};
  align-content: ${({ alignContent }) => alignContent};
  font-size: ${({ fontSize }) => fontSize};
  flex: ${({ flex }) => flex};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  clip-path: ${({ clipPath }) => clipPath};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  background: ${({ background }) => background};
  background-size: ${({ backgroundSize }) => backgroundSize};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  border: ${({ border }) => border};
  border-bottom: ${({ borderBottom }) => borderBottom};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-top: ${({ borderTop }) => borderTop};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  visibility: ${({ visibility }) => visibility};
  z-index: ${({ zIndex }) => zIndex};
  overflow: ${({ overflow }) => overflow};
  overflow-x: ${({ overflowX }) => overflowX};
  overflow-y: ${({ overflowY }) => overflowY};
  cursor: ${({ cursor }) => cursor};
  gap: ${({ gap }) => gap};
  outline: ${({ outline }) => outline};
  box-shadow: ${({ boxShadow }) => boxShadow};
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  backdrop-filter: ${({ backdropFilter }) => backdropFilter};
  order: ${({ order }) => order};
  opacity: ${({ opacity }) => opacity};
  grid-column-start: ${({ gridColumnStart }) => gridColumnStart};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: ${({ textAlign }) => textAlign};
  // hides the flex component when printing
  &.printHide {
    @media print {
      display: none;
    }
  }

  &.hideScroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  &.smoothing {
    -webkit-font-smoothing: antialiased;
  }
`

/** @component */
export default Flex
