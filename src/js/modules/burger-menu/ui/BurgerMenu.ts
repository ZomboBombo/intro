import * as _ from '../config'

/**
 * @class
 * @module BurgerMenu
*/
export default class BurgerMenu {
  private _menu: HTMLElement
  private _burger: HTMLElement

  /**
   * @constructor
   * @param {HTMLElement} IBurgerMenuProps.burgerMenu
   * @param {HTMLElement} IBurgerMenuProps.burger
  */
  constructor({ burgerMenu, burger }: _.IBurgerMenuProps) {
    this._menu = burgerMenu
    this._burger = burger
  }

  /**
   * @description Used to initiate the 'Burger-Menu' logic.
   * @returns {void}
  */
  public init(): void {
    const resetMq: MediaQueryList = window.matchMedia('(max-width: 1023px)')

    this._burger.addEventListener('click', this._onClickBurger)
    this._menu.addEventListener('click', this._onClickInsideMenu)

    resetMq.addEventListener('change', this._onResetState)
    document.addEventListener('click', this._onClickOutside)
  }

  /**
   * Private method: [_changeState()]
   * @returns {void}
  */
  private _changeState(): void {
    const isOpened: boolean = this._burger.getAttribute('aria-pressed') === 'true'

    this._menu.classList.toggle('is-opened', !isOpened)
    this._burger.setAttribute('aria-pressed', `${!isOpened}`)
    this._burger.setAttribute('aria-expanded', `${!isOpened}`)
  }

  /**
   * @callback
   * Private callback: [_onResetState]
   *
   * @returns {void}
  */
  private _onResetState = (): void => {
    this._menu.setAttribute('style', 'transition: unset')

    this._menu.classList.remove('is-opened')
    this._burger.setAttribute('aria-pressed', 'false')

    setTimeout(() => this._menu.removeAttribute('style'))
  }

  /**
   * @callback
   * Private callback: [_onClickBurger]
   * 
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickBurger = (e: MouseEvent): void => {
    e.preventDefault()
    this._changeState()
  }

  /**
   * @callback
   * Private callback: [_onClickBurger]
   * 
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickInsideMenu = (e: MouseEvent): void => {
    const _target = e.target as HTMLElement
    const isLink: boolean = typeof _target.closest('[data-burger-menu="link]') !== 'undefined'

    if (!isLink) {
      e.preventDefault()
      return
    }

    this._changeState()
  }

  /**
   * @callback
   * Private callback: [_onClickBurger]
   * 
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickOutside = (e: MouseEvent): void => {
    const _target = e.target as HTMLElement

    const notBurger: boolean = !(_target.closest('[data-burger-menu="burger"]'))
    const notInsideMenu: boolean = !(_target.closest('[data-burger-menu="menu"]'))
    const isMenuOpened: boolean = this._menu.classList.contains('is-opened')
    const isAllChecksPassed: boolean = notBurger && notInsideMenu && isMenuOpened

    if (!isAllChecksPassed) {
      return
    }

    e.preventDefault()
    this._changeState()
  }
}
