import type { NullishHTMLElem } from '../types'
import HeroTags from '../modules/HeroTags'

export default function initHeroTags(): void {
  const $heroTagsParent: NullishHTMLElem = document.querySelector('[data-hero-tags="tags-parent"]')
  const $heroTagsDescrListParent: NullishHTMLElem = document.querySelector('[data-hero-tags="descr-list-parent"]')

  if (!$heroTagsParent || !$heroTagsDescrListParent) {
    return
  }

  const $heroTagsDescrList: NullishHTMLElem = $heroTagsDescrListParent.querySelector('[data-hero-tags="descr-list"]')!

  const heroTags = new HeroTags({
    tagsParent: $heroTagsParent,
    descrListParent: $heroTagsDescrListParent,
    descrList: $heroTagsDescrList,
  })

  heroTags.init()
}
