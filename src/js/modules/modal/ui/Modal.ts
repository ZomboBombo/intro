import { NullishButton } from '../../../types'

/**
 * @class
 * @module Modal
 * @description Used for creating 'modal-windows'.
*/
export default class Modal {
  private _modal: HTMLElement
  private _modalCloseTrigger: NullishButton

  /**
   * @constructor
   * @param {HTMLElement} modal
  */
  constructor(modal: HTMLElement) {
    this._modal = modal

    if (!this._modal) {
      return
    }

    this._modalCloseTrigger = this._modal.querySelector('[data-modal="close-trigger"]')
  }

  /**
   * @description Initiates the 'Modal' logic.
   * @returns {void}
  */
  public init(): void {
    this._modalCloseTrigger && this._modalCloseTrigger.addEventListener('click', this._onClickCloseTrigger)
    document.addEventListener('keydown', this._onEscPress)
    this._watchModalStateChange()
  }

  /**
   * Private method: [_watchModalStateChange()]
   * 
   * The {MutationObserver} watched 'class' attr changes
   * on the {this._modal} element.
   * 
   * Necessary to correctly add [document] event listeners.
   * ~~~
   * 
   * @returns {void}
  */
  private _watchModalStateChange(): void {
    const modalStateChangeObserver = new MutationObserver((mutatioRecs) => {
      const classMutatationRec: MutationRecord = mutatioRecs.find((mutation) => mutation.attributeName === 'class')!
      const isModalOpened: boolean = !classMutatationRec!.oldValue!.includes('is-active')

      if (isModalOpened) {
        document.addEventListener('keydown', this._onEscPress)
        setTimeout(() => document.addEventListener('click', this._onClickOutside))
      }
    })

    modalStateChangeObserver.observe(this._modal, { attributes: true, attributeOldValue: true })
  }

  /**
   * Private method: [_closeModal()]
   * 
   * Common 'close-modal' logic for all closing ways.
   * ~~~
   * 
   * @returns {void}
  */
  private _closeModal(): void {
    this._modal.classList.remove('is-active')
  }

  /**
   * @callback
   * Private callback: [_onClickCloseTrigger]
   *
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickCloseTrigger = (e: MouseEvent): void => {
    e.preventDefault()
    this._closeModal()
    document.removeEventListener('click', this._onClickOutside)
  }

  /**
   * @callback
   * Private callback: [_onEscPress]
   *
   * @param {KeyboardEvent} e
   * @returns {void}
  */
  private _onEscPress = (e: KeyboardEvent): void => {
    const isEscPressed: boolean = e.key === 'Escape' || e.code === 'Escape'

    isEscPressed && this._closeModal()

    document.removeEventListener('keydown', this._onEscPress)
    document.removeEventListener('click', this._onClickOutside)
  }

  /**
   * @callback
   * Private callback: [_onClickOutside]
   *
   * @param {MouseEvent} e
   * @returns {void}
  */
  private _onClickOutside = (e: MouseEvent): void => {
    e.preventDefault()

    const isModalOpened: boolean = this._modal.classList.contains('is-active')
    const isClosingTarget: boolean = (e.target as HTMLElement).closest('[data-modal="window-content"]') === null

    if (isModalOpened && isClosingTarget) {
      this._closeModal()
      document.removeEventListener('click', this._onClickOutside)
    }
  }
}
