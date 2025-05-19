export interface IConsoleGroup {
  title: string | string[]
  content: string | string[]
}

export interface ICreateConsoleGroupFunc extends IConsoleGroup {
  innerGroups?: IConsoleGroup[]
}
