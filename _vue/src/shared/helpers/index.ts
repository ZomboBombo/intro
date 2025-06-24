export type Entries<T> = {
  [K in keyof T]: readonly [K, T[K]]
}[keyof T][]
