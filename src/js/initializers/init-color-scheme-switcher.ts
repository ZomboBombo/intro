import ColorSchemeSwitcher from '../modules/color-scheme-switcher'

export default function initColorSchemeSwitcher(): void {
  const $colorSchemeSwitchers: NodeListOf<HTMLElement> = document.querySelectorAll('[data-color-scheme-switcher="parent"]')

  $colorSchemeSwitchers.forEach((csSwitcher: HTMLElement) => {
    const colorSchemeSwitcher = new ColorSchemeSwitcher(csSwitcher)
    colorSchemeSwitcher.init()
  })
}
