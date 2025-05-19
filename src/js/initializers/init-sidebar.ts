import type { NullishHTMLElem } from '../_core/types'
import Sidebar from '../modules/sidebar'

export default function initSidebar(): void {
  const $sidebarElement: NullishHTMLElem = document.querySelector('[data-sidebar="sidebar"]')

  if (!$sidebarElement) {
    return
  }

  const sidebar = new Sidebar($sidebarElement)
  sidebar.init()
}
