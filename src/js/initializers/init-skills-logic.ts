import Skill from '../modules/Skill'

export default function initSkillsLogic(): void {
  const $skillTriggers: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-skill]')

  $skillTriggers.forEach((skillTrigger: HTMLButtonElement) => {
    const skill = new Skill(skillTrigger)
    skill.init()
  })
}
