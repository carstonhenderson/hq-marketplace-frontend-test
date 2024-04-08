export type Nil = null | undefined

export const isNil = (val: unknown): val is Nil =>
  val === null || val === undefined

export const isNotNil = (val: unknown): val is NonNullable<unknown> =>
  !isNil(val)

export const isPresent = (val: unknown): val is NonNullable<unknown> =>
  isNotNil(val) && val !== ""

export const isMissing = (val: unknown): boolean => !isPresent(val)

export const isEmpty = <T>(val: string | T[]): boolean => val.length === 0
