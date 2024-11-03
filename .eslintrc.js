module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  rules: {
    indent: ["error", 2],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/react-in-jsx-scope": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "object-curly-spacing": ["error", "always"],
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "always" }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
