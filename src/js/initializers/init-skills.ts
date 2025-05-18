import Skill from '../modules/skill'

export default function initSkills(): void {
  const $skillTriggers: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-skill]')

  $skillTriggers.forEach((skillTrigger: HTMLButtonElement) => {
    const skill = new Skill(skillTrigger)
    skill.init()
  })
}
