import type { Entries } from '@shared/helpers'

interface CodeExamplesDataI {
  descr: string
  usage: string
  output: string
}

export type CodeExamplesDataT = {
  [key: string]: CodeExamplesDataI
}

export interface UiKitComponentDataI<T extends object> {
  name: string
  data: Entries<T>
}
