import type { NullishHTMLElem } from '../types'

interface ISkillModalProps {
  title: string
  descr: string
  tags: string[]
}

export default class Skill {
  private _trigger: HTMLButtonElement
  private _modal: NullishHTMLElem
  private _data: JSON | null

  constructor(trigger: HTMLButtonElement) {
    this._modal = document.getElementById('modal-skill')
    this._trigger = trigger
  }

  public async init(): Promise<void> {
    if (!this._modal) {
      return
    }

    this._data = await this._fetchSkillsData()
    this._trigger.addEventListener('click', this._onClick)
  }

  private _openSkillModal(skillModalProps: ISkillModalProps): void {
    if (!this._modal) {
      return
    }

    const { title, descr, tags } = skillModalProps

    const smTitle: HTMLElement = this._modal.querySelector('[data-skill-modal="title"]')!
    const smDescr: HTMLElement = this._modal.querySelector('[data-skill-modal="descr"]')!
    const smTags: HTMLElement = this._modal.querySelector('[data-skill-modal="tags"]')!

    smTitle.textContent = title
    smDescr.textContent = descr
    smTags.innerHTML = ''
    smTags.removeAttribute('aria-hidden')

    for (const tag of tags) {
      const smTagsLiClone: Node = (this._modal.querySelector('[data-skill-modal="tags-li-template"]') as HTMLTemplateElement)!
        .content
        .cloneNode(true)

      const smTagsLi = (smTagsLiClone as HTMLElement).querySelector('li')!

      smTagsLi.textContent = tag
      smTags.append(smTagsLiClone)
    }

    this._modal.classList.add('is-active')
  }

  private async _fetchSkillsData(): Promise<JSON | null> {
    let data: JSON | null = null

    try {
      const response = await fetch('./data/skills.json')

      if (response.ok) {
        data = await response.json()
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`
        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        
        Can't fetch data.
        ~~~
        ${err}

        =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      `)
    }

    return data
  }

  // eslint-disable-next-line space-before-function-paren
  private _onClick = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()

    const currTrigger = e.currentTarget as HTMLButtonElement
    const skillId: string = currTrigger.getAttribute('data-skill')!

    if (!this._data || !this._data[skillId]) {
      return
    }

    const { title, descr, tags } = this._data[skillId]
    this._openSkillModal({ title, descr, tags })
  }
}
