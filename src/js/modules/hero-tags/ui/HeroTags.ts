
import * as _ from '../config'
import type { UndefNullishHTMLElem, NullishHTMLElem, NullishButton } from '../../../_core/types'

/**
 * @class
 * @module HeroTags
*/
export default class HeroTags {
  private static readonly CNST_ALLOWED_OUTER_TARGET_SELECTORS = new Set([
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

  /**
   * @constructor
   * @param {HTMLElement} IHeroTagsClassConstructor.tagsParent
   * @param {HTMLElement} IHeroTagsClassConstructor.descrListParent
   * @param {HTMLElement} IHeroTagsClassConstructor.descrList
  */
  constructor({ tagsParent, descrListParent, descrList }: _.IHeroTagsClassConstructor) {
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
   * @description Initiates the 'Hero-Tags' logic.
   * @returns {void}
  */
  public init(): void {
    this._tagsParent.addEventListener('click', this._onClick)
  }

  /**
   * Private method: [_getHeroTagData()]
   * @param {HTMLButtonElement} tag
   * @returns {_.IHeroTagData}
  */
  private _getHeroTagData(tag: HTMLButtonElement): _.IHeroTagData {
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
   * Private method: [_getActiveHeroTag()]
   * @returns {NullishButton}
  */
  private _getActiveHeroTag(): NullishButton {
    return this._tagsParent.querySelector('[data-hero-tag-active]')
  }

  /**
   * Private method: [_getActiveHeroTagDescrItem()]
   * @returns {NullishHTMLElem}
  */
  private _getActiveHeroTagDescrItem(): NullishHTMLElem {
    return this._descrList.querySelector('[data-hero-tags="descr-item"].is-active')
  }

  /**
   * Private method: [_resetHeroTagsSetup()]
   * @param {HTMLButtonElement} tag
   * @returns {_.TChangeHeroTagStateReturn}
  */
  private _changeHeroTagState(tag: HTMLButtonElement): _.TChangeHeroTagStateReturn {
    const {
      descrItem: tagDescrItem
    } = this._getHeroTagData(tag)

    return {
      resetToInitial(): void {
        tag.removeAttribute('data-hero-tag-active')
        tagDescrItem?.classList.remove('is-active')
      },

      setToActive(): void {
        tag.setAttribute('data-hero-tag-active', '')
        tagDescrItem?.classList.add('is-active')
      },
    }
  }

  /**
   * Private method: [_resetHeroTagsSetup()]
   * @returns {void}
  */
  private _resetHeroTagsSetup(): void {
    const currActiveTag: NullishButton = this._getActiveHeroTag()

    currActiveTag && this._changeHeroTagState(currActiveTag as HTMLButtonElement).resetToInitial()
    this._descrListParent.classList.remove('is-active')
  }

  /**
   * Private method: [_isClickOnAllowedOuterTarget()]
   * 
   * Used to check allowability of 'outer-target' click.
   *
   * Allowed target list: {this._allowedOuterClickTargets}
   * Allowed target selectors: {HeroTags.CNST_ALLOWED_OUTER_TARGET_SELECTORS}
   * ~~~
   *
   * @param {_.TAllowedOuterTarget} clickTarget
   * @returns {boolean}
  */
  private _isClickOnAllowedOuterTarget(clickTarget: _.TAllowedOuterTarget): boolean {
    const allowedTargetCb = (allowedTarget: _.TAllowedOuterTarget): boolean => {
      let isAllowedTarget = false

      for (const selector of HeroTags.CNST_ALLOWED_OUTER_TARGET_SELECTORS) {
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
   * @callback
   * Private callback: [_onClick]
   *
   * @param {MouseEvent} e
   * @returns {void}
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
   * @callback
   * Private callback: [_onOuterClick]
   *
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onOuterClick = (e: MouseEvent): void => {
    const isAllowedOuterClick: boolean = this._isClickOnAllowedOuterTarget(e.target as _.TAllowedOuterTarget)

    if (isAllowedOuterClick) {
      return
    }

    this._resetHeroTagsSetup()
    document.removeEventListener('click', this._onOuterClick)
  }
}
