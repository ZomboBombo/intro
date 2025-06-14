import { UiTitleData } from './ui-title-data'

const CodeExamples = new Map([['ui-title', UiTitleData]])

function getCodeExamples(codeExamplesId: string) {
  const codeExamplesData = CodeExamples.get(codeExamplesId)!

  return Object.entries(codeExamplesData) ?? []
}

export const UiTitleCodeExamples = getCodeExamples('ui-title')
