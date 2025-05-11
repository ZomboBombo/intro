import { debounce } from '../utils/decorators'

export default class WorkFilters {
  private _parent: HTMLElement
  private _cards: NodeListOf<HTMLElement>

  constructor(workFiltersParent: HTMLElement) {
    this._parent = workFiltersParent
  }

  public init(): void {
    this._parent.addEventListener('change', this._onChangeFilterDebounced)
    this._parent.addEventListener('reset', this._onResetFilters)

    this._cards = document.querySelectorAll('[data-work-filters="work-card"]')
  }

  private _resetCards(): void {
    this._cards.forEach((card: HTMLElement) => {
      const cardParentLi = card.parentElement as HTMLLIElement

      cardParentLi.classList.remove('is-hidden')
      cardParentLi.removeAttribute('aria-hidden')
    })
  }

  private _getCardTags(card: HTMLElement): string[] {
    const tags: NodeListOf<HTMLElement> = card.querySelectorAll('[data-work-filters="work-card-tag"]')

    return Array.from(tags).map((tag: HTMLElement) => tag.textContent!)
  }

  private _hasWorkFilterTag(tags: string[], workFilter: string): boolean {
    return tags.includes(workFilter)
  }

  private _filterCards(workFilter: string): void {
    this._resetCards()

    for (const card of this._cards) {
      const tags: string[] = this._getCardTags(card)
      const noWorkFilterTag: boolean = !this._hasWorkFilterTag(tags, workFilter)

      if (noWorkFilterTag) {
        const cardParentLi = card.parentElement as HTMLLIElement

        cardParentLi.classList.add('is-hidden')
        cardParentLi.setAttribute('aria-hidden', 'true')
      }
    }
  }

  private _onChangeFilter = (e: Event): void => {
    const currTrigger: HTMLLabelElement = (e.target as HTMLElement).closest('[data-work-filters="trigger"]')!
    const currFilterId: string = currTrigger.dataset.workFilterId!

    this._filterCards(currFilterId)
  }

  private _onChangeFilterDebounced = debounce(this._onChangeFilter, 250)

  private _onResetFilters = (): void => {
    this._resetCards()
  }
}
