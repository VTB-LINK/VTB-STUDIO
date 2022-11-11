module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
    'prettier'
  ],
  plugins: ['vue', 'prettier'],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/require-default-prop': 'off',
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ]
  },
  ignorePatterns: ['.eslintrc.js']
};
