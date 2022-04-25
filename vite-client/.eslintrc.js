module.exports = {
   env: {
      browser: true,
      es2021: true,
   },

   extends: ['plugin:vue/essential', 'airbnb-base'],

   parserOptions: {
      ecmaVersion: 'latest',
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
   },

   plugins: ['vue', '@typescript-eslint'],

   rules: {
      'no-console': 'off',

      'no-unused-expressions': 'off',

      'max-len': 'off',

      'vue/multi-word-component-names': ['error', {
         ignores: ['Auth', 'Default', 'Tabs', 'Icon'],
      }],

      'eol-last': ['error', 'always'],

      indent: ['error', 3],
   },

};
