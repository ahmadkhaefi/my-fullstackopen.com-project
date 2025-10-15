import js from '@eslint/js'
import globals from 'globals'
import {defineConfig} from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        ignores: ['dist/**'],
        plugins: {
            js,
            '@stylistic': stylistic
        },
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.node
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/linebreak-style': ['error', 'unix'],
            'no-console': 'off'
        }
    }
])
