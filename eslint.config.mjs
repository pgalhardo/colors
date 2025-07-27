//@ts-check

import pluginVue from 'eslint-plugin-vue'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'
import prettierConfig from '@vue/eslint-config-prettier'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist',
      '**/esm',
      '**/storybook-static',
      '**/coverage',
      '**/shims.d.ts',
    ],
  },

  ...pluginVue.configs['flat/recommended'],

  vueTsConfigs.recommendedTypeChecked,

  //pluginVitest.configs.recommended,
  //...storybook.configs['flat/recommended'],

  prettierConfig,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
      eqeqeq: 'error',
      'no-unused-vars': 'off',
      'prettier/prettier': 'error',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/custom-event-name-casing': [
        'warn',
        'kebab-case',
        {
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'],
        },
      ],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-macros-order': [
        'warn',
        { order: ['defineProps', 'defineEmits'] },
      ],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/eqeqeq': 'error',
      'vue/html-button-has-type': 'error',
      'vue/match-component-import-name': 'error',
      'vue/next-tick-style': 'error',
      'vue/no-bare-strings-in-template': 'error',
      'vue/no-duplicate-attr-inheritance': 'warn',
      'vue/no-empty-component-block': 'warn',
      'vue/no-multiple-objects-in-class': 'warn',
      'vue/no-ref-object-reactivity-loss': 'error',
      'vue/no-restricted-block': ['error', { element: 'style' }],
      'vue/no-root-v-if': 'error',
      'vue/no-static-inline-styles': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unsupported-features': 'error',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-useless-mustaches': 'warn',
      'vue/no-useless-v-bind': 'warn',
      'vue/prefer-define-options': 'warn',
      'vue/prefer-prop-type-boolean-first': 'error',
      'vue/prefer-true-attribute-shorthand': 'warn',
      'vue/require-emit-validator': 'error',
      'vue/require-expose': 'error',
      'vue/require-macro-variable-name': 'error',
      'vue/require-prop-comment': ['warn', { type: 'JSDoc' }],
      'vue/require-typed-object-prop': 'error',
      'vue/require-typed-ref': 'error',
      'vue/v-on-handler-style': 'error',
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
      'vue/no-v-html': 'off',
    },
  }
)
