module.exports = {
    "stories": [
        // "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
    ],
    "addons": [
        "@storybook/addon-docs",
        '@storybook/addon-actions',
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",

    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen',
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
        },
    },
}