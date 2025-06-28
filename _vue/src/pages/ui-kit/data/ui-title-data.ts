import type { CodeExamplesDataT } from '../config'

export const UiTitleData: CodeExamplesDataT = {
  Default: {
    descr: 'Default <UiTitle> component usage.',
    usage: '<UiTitle text="UiTitle" />',
    output: '<h1 class="ui-title ui-title--h1">UiTitle</h1>',
  },
  '`lvl` attr': {
    descr:
      'The `lvl` component\'s attribute usage example. `lvl` can be "h1 – h6" levels – just like default HTML headings.',
    usage: '<UiTitle text="UiTitle" lvl="h2" />',
    output: '<h2 class="ui-title ui-title--h2">UiTitle</h2>',
  },
  '`not-heading` attr': {
    descr:
      'The `not-heading` attr will make component usage is "not-heading". Instead of the <h1 / h6> tag you\'ll get the <strong> by default.',
    usage: '<UiTitle text="UiTitle" not-heading />',
    output: '<strong class="ui-title">UiTitle</strong>',
  },
  '`tag` attr': {
    descr:
      'The `tag` attr will make component with your HTML-tag you want it to be. If you use the `tag` attr you can omit the `not-heading` attr.',
    usage:
      '<UiTitle text="UiTitle" tag="span" /> or <UiTitle text="UiTitle" tag="div" /> or any other valid HTML-tag.',
    output:
      '<span class="ui-title">UiTitle</span> / <div class="ui-title">UiTitle</div>',
  },
}
