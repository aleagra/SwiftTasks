module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript'
    
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/restrict-plus-operands": ["error", { "allowString": true }],
  },
};