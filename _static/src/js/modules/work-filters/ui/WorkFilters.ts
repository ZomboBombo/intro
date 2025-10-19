import { debounce } from '../../../utils/decorators'

/**
 * @class
 * @module WorkFilters
*/
export default class WorkFilters {
  private static DataSelectors = {
    WORK_FILTER_ID: '[data-work-filter-id]',
    TRIGGER: '[data-work-filters="trigger"]',
    INPUT: '[data-work-filters="input"]',
    WORK_CARD: '[data-work-filters="work-card"]',
    WORK_CARD_TAG: '[data-work-filters="work-card-tag"]',
  }

  private _parent: HTMLElement
  private _inputs: NodeListOf<HTMLInputElement>
  private _cards: NodeListOf<HTMLElement>

  /**
   * @constructor
   * @param {HTMLElement} workFiltersParent
  */
  constructor(workFiltersParent: HTMLElement) {
    this._parent = workFiltersParent
    this._inputs = this._parent.querySelectorAll(WorkFilters.DataSelectors.INPUT)
  }

  /**
   * @description Initiates the 'WorkFilters' logic.
   * @returns {void}
  */
  init(): void {
    this._parent.addEventListener('change', this._onChangeFilterDebounced)
    this._parent.addEventListener('reset', this._onResetFilters)

    this._cards = document.querySelectorAll(WorkFilters.DataSelectors.WORK_CARD)
  }

  /**
   * Private method: [_resetCards()].
   * @returns {void}
  */
  private _resetCards(): void {
    this._cards.forEach((card: HTMLElement) => {
      const cardParentLi = card.parentElement as HTMLLIElement

      cardParentLi.classList.remove('is-hidden')
      cardParentLi.removeAttribute('aria-hidden')
    })
  }

  /**
   * Private method: [_changeInputsState()].
  */
  private _changeInputsState() {
    return {
      selectInput: (input: HTMLInputElement): void => {
        input.setAttribute('aria-checked', 'true')
      },

      resetInputs: (): void => {
        this._inputs.forEach((input: HTMLInputElement) => {
          input.setAttribute('aria-checked', 'false')
        })
      },
    }
  }

  /**
   * Private method: [_getCardTags()].
   * @param {HTMLElement} card
   * @returns {string[]}
  */
  private _getCardTags(card: HTMLElement): string[] {
    const tags: NodeListOf<HTMLElement> = card.querySelectorAll(WorkFilters.DataSelectors.WORK_CARD_TAG)

    return Array.from(tags).map((tag: HTMLElement) => tag.textContent!)
  }

  /**
   * Private method: [_hasWorkFilterTag()].
   * @param {string[]} tags
   * @param {string} workFilter
   * @returns {boolean}
  */
  private _hasWorkFilterTag(tags: string[], workFilter: string): boolean {
    return tags.includes(workFilter)
  }

  /**
   * Private method: [_filterCards()].
   * @param {string} workFilter
   * @returns {void}
  */
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

  /**
   * Private method: [_updateInputs()].
   * @param {HTMLInputElement} input
   * @returns {void}
  */
  private _updateInputs(input: HTMLInputElement): void {
    this._changeInputsState().resetInputs()
    this._changeInputsState().selectInput(input)
  }

  /**
   * @callback
   * Private callback: [_onChangeFilter]
   *
   * @param {Event} e
   * @returns {void}
  */
  private _onChangeFilter = (e: Event): void => {
    const currTrigger: HTMLLabelElement = (e.target as HTMLElement).closest(WorkFilters.DataSelectors.TRIGGER)!
    const currFilterId: string = currTrigger.dataset.workFilterId!
    const currInput: HTMLInputElement = currTrigger.querySelector(WorkFilters.DataSelectors.INPUT)!

    this._updateInputs(currInput)
    this._filterCards(currFilterId)
  }

  /**
   * @callback
   * Private callback: [_onChangeFilterDebounced]
   *
   * @description Debounced original '_onChangeFilter' callback
  */
  private _onChangeFilterDebounced = debounce(this._onChangeFilter, 250)

  /**
   * @callback
   * Private callback: [_onResetFilters]
   *
   * @returns {void}
  */
  private _onResetFilters = (): void => {
    this._resetCards()
  }
}
