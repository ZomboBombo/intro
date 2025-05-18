import * as _ from '../config'
import type { NullishHTMLElem, NullishButton } from '../../../types'

/**
 * @class
 * @module Sidebar
*/
export default class Sidebar {
  private _sidebar: HTMLElement
  private _parent: NullishHTMLElem
  private _trigger: NullishButton
  private _allyTooltipText: _.IAllyTooltipTextProps

  /**
   * @constructor
   * @param {HTMLElement} sidebar
  */
  constructor(sidebar: HTMLElement) {
    this._sidebar = sidebar

    if (!this._sidebar) {
      return
    }

    this._parent = this._sidebar.closest('[data-sidebar="parent"]') as NullishHTMLElem
    this._trigger = this._sidebar.querySelector('[data-sidebar="trigger"]') as NullishButton

    this._allyTooltipText = {
      openTxt: this._trigger?.getAttribute('data-sidebar-text-open'),
      closeTxt: this._trigger?.getAttribute('data-sidebar-text-close')
    }
  }

  /**
   * @description Used to initiate the 'Sidebar' logic.
   * @returns {void}
  */
  public init(): void {
    this._trigger?.addEventListener('click', this._onClickTrigger)
  }

  /**
   * Private method: [_setSidebarGapForSite()]
   * @returns {void}
  */
  private _setSidebarGapForSite(): void {
    const sidebarWidth = this._sidebar.offsetWidth

    document.documentElement.style.setProperty('--js-sidebar-width', `${sidebarWidth}px`)
    this._parent?.classList.add('is-sidebar-open')

    this._updAllyTooltipText('to-close')
  }

  /**
   * Private method: [_resetSidebarGapForSite()]
   * @returns {void}
  */
  private _resetSidebarGapForSite(): void {
    document.documentElement.style.setProperty('--js-sidebar-width', '0px')
    this._parent?.classList.remove('is-sidebar-open')

    this._updAllyTooltipText('to-open')
  }

  /**
   * Private method: [_updAllyTooltipText()]
   * @param {string} state
   * @returns {void}
  */
  private _updAllyTooltipText(state: string): void {
    const { openTxt, closeTxt } = this._allyTooltipText

    if (!this._trigger || !openTxt || !closeTxt) {
      return
    }

    const hasTitleAttr = this._trigger.getAttribute('title')
    const hasAriaLabelAttr = this._trigger.getAttribute('aria-label')

    hasTitleAttr && this._trigger.setAttribute('title', state === 'to-open' ? openTxt : closeTxt)
    hasAriaLabelAttr && this._trigger.setAttribute('aria-label', state === 'to-open' ? openTxt : closeTxt)
  }

  /**
   * Private method: [_updAllyTooltipText()]
   * @param {boolean} isOpen
   * @returns {void}
  */
  private _changeSidebarState(isOpen: boolean): void {
    this._sidebar.classList.toggle('is-open', !isOpen)
    this._trigger?.setAttribute('aria-pressed', `${!isOpen}`)
    this._trigger?.setAttribute('aria-expanded', `${!isOpen}`)

    isOpen
      ? this._resetSidebarGapForSite()
      : this._setSidebarGapForSite()
  }

  /**
   * @callback
   * Private callback: [_onClickTrigger]
   *
   * @param {MouseEvent | Event} e
   * @returns {void}
  */
  private _onClickTrigger = (e: MouseEvent | Event): void => {
    e.preventDefault()

    const isSidebarOpen: boolean = this._sidebar.classList.contains('is-open')
    this._changeSidebarState(isSidebarOpen)
  }
}
