module.exports = {
  "features": {
    "interactionsDebugger": true,
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "storybook-addon-designs",
    "@react-theming/storybook-addon",
  ],
  "framework": "@storybook/react"
}