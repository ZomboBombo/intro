import * as _ from '../config'
import type { NullishString, NullishHTMLElem } from '../../../_core/types'

/**
 * @class
 * @module Tooltip
 * @description Creates a 'Tooltip' based on the specified optional 'position' prop.
*/
export default class Tooltip {
  private _tooltip: HTMLElement
  private _position: string

  /**
   * @constructor
   * @param {HTMLElement} tooltip
  */
  constructor(tooltip: HTMLElement) {
    this._tooltip = tooltip

    if (!this._tooltip) {
      return
    }

    this._position = this._getTooltipPosition(this._tooltip.getAttribute('data-tooltip-position'))
  }

  /**
   * @description Initiates the 'Tooltip' logic.
   * @returns {void}
  */
  public init(): void {
    const text: NullishString = this._getTooltipText()

    if (!text) {
      return
    }

    this._setTooltip(text)

    const allyAttrObserver = new MutationObserver(() => {
      const updText: string = this._getTooltipText()!
      this._updTooltipText(updText)
    })

    allyAttrObserver.observe(this._tooltip, { attributes: true })
  }

  /**
   * Private method: [_getTooltipPosition()]
   * @param {NullishString} userPosition
   * @returns {string}
  */
  private _getTooltipPosition(userPosition: NullishString): string {
    if (!userPosition) {
      return _.TooltipPosition.Right
    }

    const isValidUserPostion: boolean = Object.values(_.TooltipPosition).some((position) => position === userPosition)

    return isValidUserPostion
      ? userPosition
      : _.TooltipPosition.Right
  }

  /**
   * Private method: [_getTooltipText()]
   * @returns {NullishString}
  */
  private _getTooltipText(): NullishString {
    const allyAttr: NullishString = this._tooltip.getAttribute('aria-label') ?? this._tooltip.getAttribute('title')
    const dataTooltip: NullishString = this._tooltip.getAttribute('data-tooltip')

    return allyAttr || dataTooltip
  }

  /**
   * Private method: [_setTooltip()]
   * @param {string} text
   * @returns {void}
  */
  private _setTooltip(text: string): void {
    const tooltipTextElem: HTMLElement = document.createElement('span')
    tooltipTextElem.classList.add('tooltip__text')
    tooltipTextElem.setAttribute('data-tooltip-text', '')
    tooltipTextElem.textContent = text

    const computedPosition: string = window.getComputedStyle(this._tooltip)['position']
    const isPositionAllow: boolean = computedPosition === 'static' || computedPosition === 'relative'

    this._tooltip.appendChild(tooltipTextElem)
    this._tooltip.classList.add('tooltip')
    isPositionAllow && this._tooltip.classList.add('tooltip--pos-relative')

    this._tooltip.classList.add(`tooltip--${this._position}`)

    const hasTitleAttr: boolean = this._tooltip.hasAttribute('title')
    hasTitleAttr && this._tooltip.removeAttribute('title')
  }

  /**
   * Private method: [_updTooltipText()]
   * @param {string} text
   * @returns {void}
  */
  private _updTooltipText(text: string): void {
    const currTooltipTextElem = this._tooltip.querySelector('[data-tooltip-text]') as NullishHTMLElem
    currTooltipTextElem && (currTooltipTextElem.textContent = text)
  }
}
