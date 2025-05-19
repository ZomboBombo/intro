import type { UndefNullishHTMLElem, NullishHTMLElem } from '../../../_core/types'

export type TChangeHeroTagStateReturn = {
  resetToInitial(): void
  setToActive(): void
}

export type TAllowedOuterTarget = HTMLElement | HTMLButtonElement

export interface IHeroTagsClassConstructor {
  tagsParent: HTMLElement
  descrListParent: HTMLElement
  descrList: HTMLElement
}

export interface IHeroTagData {
  id: string
  descrItem: UndefNullishHTMLElem
  descrTextEntity: NullishHTMLElem
}
