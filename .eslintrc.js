module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react'],
  env: {
    jest: true
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'jsx-quotes': 'off',
    camelcase: 'off',
    indent: 'off',
    'react/jsx-indent': 'off'
  }
}
