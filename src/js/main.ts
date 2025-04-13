import initBurgerMenu from './initializers/init-burger-menu'
import initSidebar from './initializers/init-sidebar'
import initTooltip from './initializers/init-tooltip'
import initColorSchemeSwitcher from './initializers/init-color-scheme-switcher'
import initHeroTags from './initializers/init-hero-tags'
import initModals from './initializers/init-modals'
import initSkillsLogic from './initializers/init-skills-logic'

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu()
  initSidebar()
  initTooltip()
  initHeroTags()
  initSkillsLogic()
})

/*
  В 'load' добавляются скрипты,
  не участвующие в работе первого экрана
*/
window.addEventListener('load', () => {
  initColorSchemeSwitcher()
  initModals()
})
