export default class Modal {
  private _modal: HTMLElement
  private _modalCloseTrigger: HTMLButtonElement

  constructor(modal: HTMLElement) {
    this._modal = modal

    if (!this._modal) {
      return
    }

    this._modalCloseTrigger = this._modal.querySelector('[data-modal="close-trigger"]')!
  }

  public init(): void {
    this._modalCloseTrigger.addEventListener('click', this._onCloseModal)
  }

  private _onCloseModal = (e: MouseEvent): void => {
    e.preventDefault()

    this._modal.classList.remove('is-active')
  }
}
