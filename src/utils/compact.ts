import { isPresent } from "./nil"

export const compact = <T>(arr: Array<T | null | undefined | boolean>): T[] =>
  arr.filter(Boolean).filter(isPresent) as T[]
