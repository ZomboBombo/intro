import { toKebabCase } from '@shared/utils'
import type { LinkI, UiKitNavAnchorI } from '@shared/models'
import type { UiKitComponentDataI, CodeExamplesDataT } from '../config'
import { UiTitleData } from './ui-title-data'

const UiKitData: Map<string, UiKitComponentDataI<CodeExamplesDataT>> = new Map([
  [
    'ui-title',
    {
      name: 'UiTitle',
      data: Object.entries(UiTitleData),
    },
  ],
])

const UiKitDataAnchors: UiKitNavAnchorI[] = []

for (const [key, { name, data }] of UiKitData) {
  const sublinks: LinkI[] = []

  data.forEach(([_dataKey]) => {
    sublinks.push({ href: `#${toKebabCase(_dataKey)}`, name: _dataKey })
  })

  UiKitDataAnchors.push({ href: `#${key}`, name, sublinks })
}

export { UiKitData, UiKitDataAnchors }
