import type { NullishHTMLElem } from '../types'
import Modal from '../modules/Modal'

/**
 * 
 * [TODO]:
 * 
 * 1) Подумать над тем, как можно упростить
 * логику присваивания обработчиков событий
 * для «опенеров» модалок;
 * 
 * 2) Попытаться упростить всю логику:
 * возможно, как-то нужно перенести функционал
 * «опенеров» внутрь класса [Modal];
*/
export default function initModals(): void {
  const modalOpeners: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-open-modal]')

  if (!modalOpeners.length) {
    return
  }

  modalOpeners.forEach((modalOpener: HTMLButtonElement) => {
    const modalId: string = modalOpener.getAttribute('data-open-modal')!
    const modalWindow: NullishHTMLElem = document.getElementById(modalId)

    if (!modalWindow) {
      return
    }

    modalOpener.onclick = (e: MouseEvent) => {
      e.preventDefault()
      modalWindow.classList.add('is-active')
    }
  })

  const modals: NodeListOf<HTMLElement> = document.querySelectorAll('[data-modal="window"]')

  modals.forEach((modalWindow: HTMLElement) => {
    const modal = new Modal(modalWindow)
    modal.init()
  })
}
