import { NullishHTMLElem } from '../types'
import WorkFilters from '../modules/WorkFilters'

export default function initWorkFilters() {
  const $workFiltersParent: NullishHTMLElem = document.querySelector('[data-work-filters="parent"]')

  if (!$workFiltersParent) {
    return
  }

  const workFilters = new WorkFilters($workFiltersParent)
  workFilters.init()
}
