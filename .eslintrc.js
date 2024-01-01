module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier',
    'eslint-config-prettier',
    'plugin:vuetify/base'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'error',
    'no-undef': 'off', // invalid
    'no-irregular-whitespace': 'off',
    'no-useless-escape': 'off', // invalid
    'vue/no-mutating-props': 'error', // invalid
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'error',
    'prettier/prettier': ['error', { printWidth: 80 }],
    'vue/require-explicit-emits':
      process.env.NODE_ENV === 'production' ? 'off' : 'error',
    'vue/order-in-components':
      process.env.NODE_ENV === 'production' ? 'off' : 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  }
}
