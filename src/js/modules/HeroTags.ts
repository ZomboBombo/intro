type TChangeHeroTagStateReturn = {
  resetToInitial(): void
  setToActive(): void
}

type TAllowedOuterTarget = HTMLElement | HTMLButtonElement

interface IHeroTagsClassConstructor {
  tagsParent: HTMLElement
  descrListParent: HTMLElement
  descrList: HTMLElement
}

interface IHeroTagData {
  id: string
  descrItem: UndefNullishHTMLElem
  descrTextEntity: NullishHTMLElem
}


/**
 * Class [HeroTags]
 * ~~~
 * 
 * Used for 'Hero-Tags' logic initializtion.
 * ~~~~
 * 
 * Constructor params has {IHeroTagsClassConstructor}
 * initialization type:
 * 
 * @param {HTMLElement} tagsParent
 * @param {HTMLElement} descrListParent
 * @param {HTMLElement} descrList
*/
export default class HeroTags {
  private _CNST_ALLOWED_OUTER_TARGET_SELECTORS = new Set([
    '[data-hero-tags="tags-parent"]',
    '[data-hero-tags="tag"]',
    '[data-hero-tags="descr-list-parent"]',
    '[data-hero-tags="descr-list"]',
    '[data-hero-tags="descr-item"]',
    '[data-hero-tags="descr-title"]',
    '[data-hero-tags="descr-text"]',
  ])

  private _tagsParent: HTMLElement
  private _descrListParent: HTMLElement
  private _descrList: HTMLElement
  private _allowedOuterClickTargets: HTMLElement[]

  constructor({ tagsParent, descrListParent, descrList }: IHeroTagsClassConstructor) {
    this._tagsParent = tagsParent
    this._descrListParent = descrListParent
    this._descrList = descrList

    if (!this._tagsParent || !this._descrListParent || !this._descrList) {
      return
    }

    this._allowedOuterClickTargets = [
      this._tagsParent,
      this._descrListParent,
      this._descrList,
    ]
  }

  /**
   * ============================================================
   * 
   * The init {public} method.
   * ~~~
   * 
   * The main class initialization method
   * ~~~
   * 
   * @returns {void}
   * 
   * ============================================================
  */
  public init(): void {
    this._tagsParent.addEventListener('click', this._onClick)
  }

  /**
   * ============================================================
   * 
   * The _getHeroTagData {private} method.
   * ~~~
   * 
   * @param {HTMLButtonElement} tag
   * @returns {IHeroTagData}
   * 
   * ============================================================
  */
  private _getHeroTagData(tag: HTMLButtonElement): IHeroTagData {
    const id: string = tag.getAttribute('aria-describedby') ?? ''
    const descrTextEntity: NullishHTMLElem = this._descrList.querySelector(`#${id}`)
    const descrItem: UndefNullishHTMLElem = descrTextEntity?.closest('[data-hero-tags="descr-item"]') ?? descrTextEntity?.parentElement

    return {
      id,
      descrItem,
      descrTextEntity,
    }
  }

  /**
   * ============================================================
   * 
   * The _getActiveHeroTag {private} method.
   * ~~~
   * 
   * @returns {NullishButton}
   * 
   * ============================================================
  */
  private _getActiveHeroTag(): NullishButton {
    return this._tagsParent.querySelector('[data-hero-active-tag]')
  }

  /**
   * ============================================================
   * 
   * The _getActiveHeroTagDescrItem {private} method.
   * ~~~
   * 
   * @returns {NullishButton}
   * 
   * ============================================================
  */
  private _getActiveHeroTagDescrItem(): NullishHTMLElem {
    return this._descrList.querySelector('[data-hero-tags="descr-item"].is-active')
  }

  /**
   * ============================================================
   * 
   * The _changeHeroTagState {private} method.
   * ~~~
   * 
   * @param {HTMLButtonElement} tag
   * @returns {TChangeHeroTagStateReturn}
   * 
   * ============================================================
  */
  private _changeHeroTagState(tag: HTMLButtonElement): TChangeHeroTagStateReturn {
    const {
      descrItem: tagDescrItem
    } = this._getHeroTagData(tag)

    return {
      resetToInitial(): void {
        tag.removeAttribute('data-hero-active-tag')
        tagDescrItem?.classList.remove('is-active')
      },

      setToActive(): void {
        tag.setAttribute('data-hero-active-tag', '')
        tagDescrItem?.classList.add('is-active')
      },
    }
  }

  /**
   * ============================================================
   * 
   * The _resetHeroTagsSetup {private} method.
   * ~~~
   * 
   * @returns {void}
   * 
   * ============================================================
  */
  private _resetHeroTagsSetup(): void {
    const currActiveTag: NullishButton = this._getActiveHeroTag()

    currActiveTag && this._changeHeroTagState(currActiveTag as HTMLButtonElement).resetToInitial()
    this._descrListParent.classList.remove('is-active')
  }

  /**
   * ============================================================
   * 
   * The _isClickOnAllowedOuterTarget {private} method.
   * ~~~
   * 
   * Used to check allowability of 'outer-target' click.
   * 
   * Allowed target list: {this._allowedOuterClickTargets}
   * Allowed target selectors: {this._CNST_ALLOWED_OUTER_TARGET_SELECTORS}
   * ~~~
   * 
   * @param {TAllowedOuterTarget} clickTarget
   * @returns {boolean}
   * 
   * ============================================================
  */
  private _isClickOnAllowedOuterTarget(clickTarget: TAllowedOuterTarget): boolean {
    const allowedTargetCb = (allowedTarget: TAllowedOuterTarget): boolean => {
      let isAllowedTarget = false

      for (const selector of this._CNST_ALLOWED_OUTER_TARGET_SELECTORS) {
        if (clickTarget.closest(selector) === allowedTarget) {
          isAllowedTarget = true
          break
        }
      }

      return isAllowedTarget
    }

    return this._allowedOuterClickTargets.some(allowedTargetCb)
  }

  /**
   * ============================================================
   * 
   * The _onClick {private} method.
   * ~~~
   * 
   * @param {MouseEvent} e (event)
   * @returns {void}
   * 
   * ============================================================
  */
  private _onClick = (e: MouseEvent): void => {
    e.preventDefault()

    const currTag: NullishButton = (e.target as HTMLElement).closest('[data-hero-tags="tag"]')

    if (!currTag) {
      return
    }

    const {
      id: currTagId
    } = this._getHeroTagData(currTag as HTMLButtonElement)

    const activeTagDescrTextEntity: UndefNullishHTMLElem = this._getActiveHeroTagDescrItem()?.querySelector('[data-hero-tags="descr-text"]')
    const activeTagId: string = activeTagDescrTextEntity?.id ?? ''

    if (activeTagId && currTagId === activeTagId) {
      return
    }

    const activeTag: NullishButton = this._tagsParent.querySelector(`[aria-describedby="${activeTagId}"]`)

    activeTag && this._changeHeroTagState(activeTag as HTMLButtonElement).resetToInitial()
    this._changeHeroTagState(currTag as HTMLButtonElement).setToActive()

    this._descrListParent.classList.add('is-active')
    document.addEventListener('click', this._onOuterClick)
  }

  /**
   * ============================================================
   * 
   * The _onOuterClick {private} method.
   * ~~~
   * 
   * @param {MouseEvent} e (event)
   * @returns {void}
   * 
   * ============================================================
  */
  private _onOuterClick = (e: MouseEvent): void => {
    const isAllowedOuterClick: boolean = this._isClickOnAllowedOuterTarget(e.target as TAllowedOuterTarget)

    if (isAllowedOuterClick) {
      return
    }

    this._resetHeroTagsSetup()
    document.removeEventListener('click', this._onOuterClick)
  }
}
