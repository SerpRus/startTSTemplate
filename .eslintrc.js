module.exports = {
    env: {
        browser: true,
        amd: true,
        node: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        "@typescript-eslint/indent": [ "error", 4],
        'linebreak-style': 0,
        'no-new': 0,
        'no-undef': 0,
    },
};
