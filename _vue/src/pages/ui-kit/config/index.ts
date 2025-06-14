interface CodeExamplesDataI {
  descr: string
  usage: string
  output: string
}

export type CodeExamplesDataT = {
  [key: string]: CodeExamplesDataI
}
