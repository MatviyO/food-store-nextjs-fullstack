module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'object-curly-spacing': ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
