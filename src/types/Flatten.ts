export type Flatten<T> = T extends Array<infer K> ? K : T
