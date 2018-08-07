// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 0,
    // always semi
    "semi": [2, "always"],
    "camelcase": 1,
    "no-var": 2
  },
  globals: {
    "ol": false
  }
};