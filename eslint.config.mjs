import adminConfig from "../Platform.AdminUI/eslint.config.js"

export default [
  ...adminConfig,
  {
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
]
