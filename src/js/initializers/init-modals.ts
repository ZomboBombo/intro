import type { NullishHTMLElem } from '../types'
import Modal from '../modules/modal'

/**
 * @function _setupModalTriggers()
 *
 * Base 'modal-triggers' setup to add event-listeners
 * for all triggers to open Modals.
 * ~~~
 *
 * @returns {void}
*/
function _setupModalTriggers(): void {
  const $modalTriggers: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-open-modal]')

  if (!$modalTriggers.length) {
    return
  }

  $modalTriggers.forEach((trigger: HTMLButtonElement) => {
    const modalId: string = trigger.getAttribute('data-open-modal')!
    const modal: NullishHTMLElem = document.getElementById(modalId)

    if (!modal) {
      return
    }

    trigger.onclick = (e: MouseEvent) => {
      e.preventDefault()
      modal.classList.add('is-active')
    }
  })
}

/**
 * @function _setupModals()
 *
 * Base Modals setup.
 * ~~~
 *
 * @returns {void}
*/
function _setupModals(): void {
  const $modals: NodeListOf<HTMLElement> = document.querySelectorAll('[data-modal="window"]')

  $modals.forEach((modalWindow: HTMLElement) => {
    const modal = new Modal(modalWindow)
    modal.init()
  })
}

export default function initModals(): void {
  _setupModalTriggers()
  _setupModals()
}
