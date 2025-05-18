import * as _ from '../config'
import type { NullishHTMLElem } from '../../../types'
import Typewriter from '../../typewriter'

/**
 * @class
 * @module Skill
 * @description Create a 'Skill' instance for the «Skills» page.
*/
export default class Skill {
  /**
   * [CNST_DESCR_TYPING_DELAY]: text-typing animation delay.
   * Based on CSS's 'transition-delay' for 'modal-skill' opening animation.
  */
  private static CNST_DESCR_TYPING_DELAY = 600

  private _data: JSON | null
  private _trigger: HTMLButtonElement
  private _modal: NullishHTMLElem

  /**
   * @constructor
   * @param {HTMLButtonElement} trigger
  */
  constructor(trigger: HTMLButtonElement) {
    this._modal = document.getElementById('modal-skill')
    this._trigger = trigger
  }

  /**
   * @description Used to initiate the 'Skill' logic.
   * @returns {void}
  */
  public async init(): Promise<void> {
    if (!this._modal) {
      return
    }

    this._data = await this._fetchSkillsData()
    this._trigger.addEventListener('click', this._onClick)
  }

  /**
   * Private method: [_openSkillModal()]
   * @param {ISkillModalProps} skillModalProps
   * @returns {void}
  */
  private _openSkillModal(skillModalProps: _.ISkillModalProps): void {
    if (!this._modal) {
      return
    }

    const {
      title,
      descr,
      preview,
      caption,
      tags,
    } = skillModalProps

    const smTitle: HTMLElement = this._modal.querySelector('[data-skill-modal="title"]')!
    const smDescr: HTMLElement = this._modal.querySelector('[data-skill-modal="descr"]')!
    const smPreview: HTMLElement = this._modal.querySelector('[data-skill-modal="preview"]')!
    const smCaption: HTMLElement = this._modal.querySelector('[data-skill-modal="caption"]')!
    const smTags: HTMLElement = this._modal.querySelector('[data-skill-modal="tags"]')!

    smTitle.textContent = title
    smDescr.textContent = descr
    smCaption.textContent = caption
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

    this._setSkillPreview(smPreview, preview)
    this._typeDescrText(smDescr)

    this._modal.classList.add('is-active')
  }

  /**
   * Private method: [_setSkillPreview()]
   * @param {HTMLElement} previewBlock
   * @param {string} previewSrc
   * @returns {void}
  */
  private _setSkillPreview(previewBlock: HTMLElement, previewSrc: string): void {
    if (previewBlock.hasAttribute('aria-hidden')) {
      previewBlock.removeAttribute('aria-hidden')
    }

    const video: HTMLVideoElement | null = previewBlock.querySelector('video')

    if (video) {
      video.src = previewSrc
    }
  }

  /**
   * Private method: [_typeDescrText()]
   * @param {HTMLElement} descrBlock
   * @returns {void}
  */
  private _typeDescrText(descrBlock: HTMLElement): void {
    descrBlock.style.setProperty('display', 'none')

    setTimeout(() => {
      descrBlock.style.removeProperty('display')

      const descrBlockTypewriter = new Typewriter(descrBlock)
      descrBlockTypewriter.type()
    }, Skill.CNST_DESCR_TYPING_DELAY)
  }

  /**
   * Private method: [_fetchSkillsData()]
   * @returns {Promise<JSON | null>}
  */
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

  /**
   * @callback
   * Private callback: [_onClick]
   *
   * @param {MouseEvent} e
   * @returns {Promise<void>}
  */
  // eslint-disable-next-line space-before-function-paren
  private _onClick = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()

    const currTrigger = e.currentTarget as HTMLButtonElement
    const skillId: string = currTrigger.getAttribute('data-skill')!

    if (!this._data || !this._data[skillId]) {
      return
    }

    const skillData: _.ISkillModalProps = this._data[skillId]
    this._openSkillModal(skillData)
  }
}
