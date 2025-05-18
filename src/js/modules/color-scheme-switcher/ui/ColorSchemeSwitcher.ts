import * as _ from '../config'
import type { NullishString, UndefinedishHTMLElem } from '../../../types'

/**
 * @class
 * @module ColorSchemeSwitcher
*/
export default class ColorSchemeSwitcher {
  private _switcher: HTMLElement
  private _controls: NodeListOf<HTMLElement>

  /**
   * @constructor
   * @param {HTMLElement} colorSchemeSwitcher
  */
  constructor(colorSchemeSwitcher: HTMLElement) {
    this._switcher = colorSchemeSwitcher

    if (!this._switcher) {
      return
    }

    this._controls = this._switcher.querySelectorAll('[data-color-scheme-switcher="control"]')
  }

  /**
   * @description Public method init(). Used to initiate the 'Color-Scheme-Switcher' logic.
   * @returns {void}
  */
  public init(): void {
    const initialColorScheme: string = this._getColorSchemeFromLocalStorage() ?? 'dark'
    this._setColorScheme(initialColorScheme)

    this._controls.forEach((control: HTMLElement) => {
      control.addEventListener('click', this._onClickControl)
    })
  }

  /**
   * Private method: [_getColorSchemeFromLocalStorage()]
   * @returns {NullishString}
  */
  private _getColorSchemeFromLocalStorage(): NullishString {
    return localStorage.getItem('color_scheme')
  }

  /**
   * Private method: [_saveColorSchemeToLocalStorage()]
   * @param {string} colorScheme
   * @returns {void}
  */
  private _saveColorSchemeToLocalStorage(colorScheme: string): void {
    localStorage.setItem('color_scheme', colorScheme)
  }

  /**
   * Private method: [_setActiveControl()]
   * @param {HTMLElement[]} ISetActiveControlProps.controls
   * @param {string} ISetActiveControlProps.colorScheme
   * @returns {void}
  */
  private _setActiveControl({ controls, colorScheme }: _.ISetActiveControlProps): void {
    const currActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.classList.contains('is-active'))
    const nextActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.getAttribute('data-color-scheme') === colorScheme)

    currActiveControl?.classList.remove('is-active')
    nextActiveControl?.classList.add('is-active')
  }

  /**
   * Private method: [_setColorScheme()]
   * @param {string} colorScheme
   * @returns {void}
  */
  private _setColorScheme(colorScheme: string): void {
    const controls: HTMLElement[] = Array.from(this._controls)

    document.documentElement.setAttribute('data-color-scheme', colorScheme)

    this._setActiveControl({ controls, colorScheme })
    this._saveColorSchemeToLocalStorage(colorScheme)
    this._updateOtherSwitchers(colorScheme)
  }

  /**
   * Private method: [_updateOtherSwitchers()]
   * @param {string} colorScheme
   * @returns {void}
  */
  private _updateOtherSwitchers(colorScheme: string): void {
    const switchers: NodeListOf<HTMLElement> = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

    switchers.forEach((switcher: HTMLElement) => {
      const controls: HTMLElement[] = Array.from(switcher.querySelectorAll('[data-color-scheme-switcher="control"]'))
      this._setActiveControl({ controls, colorScheme })
    })
  }

  /**
   * @callback
   * Private method: [_onClickControl]
   *
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickControl = (e: MouseEvent): void => {
    e.preventDefault()

    const currControl = e.currentTarget as HTMLElement
    const colorScheme: NullishString = currControl.getAttribute('data-color-scheme')

    colorScheme && this._setColorScheme(colorScheme)
  }
}
