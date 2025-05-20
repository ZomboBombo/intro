import CopyToClipboard from '../modules/copy-to-clipboard'

export default function initCopyToClipboard(): void {
  const $copyToClipboardTriggers: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-copy-to-clipboard="trigger"]')

  $copyToClipboardTriggers.forEach((trigger: HTMLButtonElement) => {
    const copyToClipboard = new CopyToClipboard(trigger)
    copyToClipboard.init()
  })
}
