export default class Tooltip {
  private _tooltip: HTMLElement
  private _position: string

  constructor(tooltip: HTMLElement) {
    this._tooltip = tooltip

    if (!this._tooltip) {
      return
    }

    this._position = this._tooltip.getAttribute('data-tooltip-position') || 'right'
  }

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

  private _getTooltipText(): NullishString {
    const allyAttr: NullishString = this._tooltip.getAttribute('aria-label') ?? this._tooltip.getAttribute('title')
    const dataTooltip: NullishString = this._tooltip.getAttribute('data-tooltip')

    return allyAttr || dataTooltip
  }

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

  private _updTooltipText(text: string): void {
    const currTooltipTextElem = this._tooltip.querySelector('[data-tooltip-text]') as NullishHTMLElem
    currTooltipTextElem && (currTooltipTextElem.textContent = text)
  }
}
