import jsRules from '@eslint/js'
import { TsRecommendedRulesSet, VueRecommendedRulesSet } from './eslint.rules.mjs'

export default [
  /**
   * ===[ Recommended «JS» Rules-Set ]=== */
  jsRules.configs.recommended,
  /**
   * ===[ Recommended «TypeScript» Rules-Set ]=== */
  TsRecommendedRulesSet,
  /**
   * ===[ Recommended «Vue 3» Rules-Set ]=== */
  VueRecommendedRulesSet,
  /**
   * ===[ Common Rules ]=== */
  {
    rules: {
      'no-console': 1,
      'no-unused-vars': 'warn',
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
    },
  },
]
