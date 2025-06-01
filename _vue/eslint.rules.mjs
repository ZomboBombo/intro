import globals from 'globals'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

/**
 * ===[ Recommended «TypeScript» Rules-Set ]===
 * */
export const TsRecommendedRulesSet = {
  plugins: { '@typescript-eslint': tsPlugin },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
  }
}

/**
 * ===[ Recommended «Vue 3» Rules-Set ]===
 * */
export const VueRecommendedRulesSet = {
  files: ['**/*.vue'],
  ...vuePlugin.configs['vue3-recommended'], // Используем flat-версию
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    globals: {
      ...globals.node,
    }
  }
}
