module.exports = {
    root: true,
    env: {
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: ['eslint:recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        process: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'spaced-comment': 2,
    },
};
