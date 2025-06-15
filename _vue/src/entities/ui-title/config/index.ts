type UiTitleLvlT = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface UiTitleI {
  text: string
  notHeading?: boolean
  isCenteredHorizontal?: boolean
  tag?: string
  lvl?: UiTitleLvlT
}
