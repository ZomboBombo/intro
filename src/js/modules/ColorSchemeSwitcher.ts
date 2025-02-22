interface ISetActiveControlProps {
  controls: HTMLElement[]
  colorScheme: string
}

export default class ColorSchemeSwitcher {
  private _switcher: HTMLElement
  private _controls: NodeListOf<HTMLElement>

  constructor(colorSchemeSwitcher: HTMLElement) {
    this._switcher = colorSchemeSwitcher

    if (!this._switcher) {
      return
    }

    this._controls = this._switcher.querySelectorAll('[data-color-scheme-switcher="control"]')
  }

  public init(): void {
    const initialColorScheme: string = this._getColorSchemeFromLocalStorage() ?? 'dark'
    this._setColorScheme(initialColorScheme)

    this._controls.forEach((control: HTMLElement) => {
      control.addEventListener('click', this._onClickControl)
    })
  }

  private _getColorSchemeFromLocalStorage(): NullishString {
    return localStorage.getItem('color_scheme')
  }

  private _saveColorSchemeToLocalStorage(colorScheme: string): void {
    localStorage.setItem('color_scheme', colorScheme)
  }

  private _setActiveControl({ controls, colorScheme }: ISetActiveControlProps): void {
    const currActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.classList.contains('is-active'))
    const nextActiveControl: UndefinedishHTMLElem = controls.find((control: HTMLElement) => control.getAttribute('data-color-scheme') === colorScheme)

    currActiveControl?.classList.remove('is-active')
    nextActiveControl?.classList.add('is-active')
  }

  private _setColorScheme(colorScheme: string): void {
    const controls: HTMLElement[] = Array.from(this._controls)

    document.documentElement.setAttribute('data-color-scheme', colorScheme)

    this._setActiveControl({ controls, colorScheme })
    this._saveColorSchemeToLocalStorage(colorScheme)
    this._updateOtherSwitchers(colorScheme)
  }

  private _updateOtherSwitchers(colorScheme: string): void {
    const switchers: NodeListOf<HTMLElement> = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

    switchers.forEach((switcher: HTMLElement) => {
      const controls: HTMLElement[] = Array.from(switcher.querySelectorAll('[data-color-scheme-switcher="control"]'))
      this._setActiveControl({ controls, colorScheme })
    })
  }

  private _onClickControl = (e: MouseEvent): void => {
    e.preventDefault()

    const currControl = e.currentTarget as HTMLElement
    const colorScheme: NullishString = currControl.getAttribute('data-color-scheme')

    colorScheme && this._setColorScheme(colorScheme)
  }
}
