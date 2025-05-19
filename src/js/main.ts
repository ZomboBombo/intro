declare const __APP_TYPE__: string
declare const __APP_VER__: string

import initBurgerMenu from './initializers/init-burger-menu'
import initSidebar from './initializers/init-sidebar'
import initTooltip from './initializers/init-tooltip'
import initColorSchemeSwitcher from './initializers/init-color-scheme-switcher'
import initHeroTags from './initializers/init-hero-tags'
import initModals from './initializers/init-modals'
import initSkills from './initializers/init-skills'
import initWorkFilters from './initializers/init-work-filters'
import initConsoleEasterEggs from './initializers/init-console-easter-eggs'

/**
 * @function setupBuildVersion()
 *
 * Setup the 'build-version' from 'package.json' data. 
 * ~~~
 * 
 * @returns {void}
*/
function setupBuildVersion(): void {
  const buildVersionBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('[data-build-version="block"]')

  if (!buildVersionBlocks.length) {
    return
  }

  const buildVersion: string = `${__APP_TYPE__}-${__APP_VER__}`
  buildVersionBlocks.forEach((block: HTMLElement) => block.textContent = buildVersion)
}

/*
  'DOMContentLoaded' event listener is primary
  for all scripts placement.
*/
document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu()
  initSidebar()
  initTooltip()
  initHeroTags()
  initSkills()
})

/*
  'load' event listener processes the scripts
  that aren't involved in the "first screen" operations.
*/
window.addEventListener('load', () => {
  initColorSchemeSwitcher()
  initModals()
  initWorkFilters()
  initConsoleEasterEggs()

  setupBuildVersion()
})
