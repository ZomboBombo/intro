import type { UiKitComponentDataI, CodeExamplesDataT } from '../config'
import { UiTitleData } from './ui-title-data'

export const UiKitData: Map<
  string,
  UiKitComponentDataI<CodeExamplesDataT>
> = new Map([
  [
    'ui-title',
    {
      name: 'UiTitle',
      data: Object.entries(UiTitleData),
    },
  ],
])
