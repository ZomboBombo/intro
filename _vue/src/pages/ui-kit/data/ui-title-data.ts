import type { CodeExamplesDataT } from '../config'

export const UiTitleData: CodeExamplesDataT = {
  default: {
    descr: 'Default <UiTitle> component usage',
    usage: '<UiTitle text="UiTitle" />',
    output: '<h1 class="ui-title ui-title--h1">UiTitle</h1>',
  },
  lvlH2: {
    descr: '',
    usage: '<UiTitle text="UiTitle" lvl="h2" />',
    output: '',
  },
  notHeading: {
    descr: '',
    usage: '<UiTitle text="UiTitle" not-heading />',
    output: '',
  },
  tagSpan: {
    descr: '',
    usage: '<UiTitle text="UiTitle" tag="span" />',
    output: '',
  },
  tagDiv: {
    descr: '',
    usage: '<UiTitle text="UiTitle" tag="div" />',
    output: '',
  },
}
