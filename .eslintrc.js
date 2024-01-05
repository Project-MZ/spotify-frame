module.exports = {
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    // allow not using positional arguments before the last used argument
    'no-unused-vars': [
      'warn',
      { args: 'after-used', ignoreRestSiblings: true },
    ],

    // allow class properties with no blank line inbetween
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],

    // allow voiding floating promise
    'no-void': ['error', { allowAsStatement: true }],

    // allow instance method without "this"
    'class-methods-use-this': 'off',
  },
  overrides: [
    /**
     * jsx
     */
    {
      files: ['**/*.jsx', '**/*.tsx'],
      extends: ['airbnb', 'airbnb/hooks', 'plugin:@next/next/core-web-vitals'],
      plugins: ['react'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        JSX: true,
      },
      rules: {
        // hush no-use-before-define error in "import React from 'react';"
        // see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],

        // enforce .client.tsx naming for client components
        'no-restricted-syntax': [
          'error',
          {
            selector: 'Literal[value=/^use client$/]',
            message: 'Rename the file to *.client.tsx to use "use client".',
          },
        ],

        // allow jsx in .tsx
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],

        // nextjs does not need React in every file
        'react/react-in-jsx-scope': 'off',

        // use this pattern for default props
        //
        // interface Props {
        //   prop1?: boolean;
        // }
        // const Component1 = ({ prop1 = false }: Props) => (
        //   <Component1 prop1={prop1} />
        // );
        'react/require-default-props': 'off',

        // allow <App {...props} />
        'react/jsx-props-no-spreading': 'off',

        // enforce arrow function for functional components
        'react/function-component-definition': [
          'error',
          { namedComponents: 'arrow-function' },
        ],

        // use <Link> instead of <a> for links
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton'],
          },
        ],

        // custom input
        'jsx-a11y/label-has-associated-control': [
          2,
          {
            labelComponents: ['Label'],
            controlComponents: ['Input'],
          },
        ],

        // allow img tag
        '@next/next/no-img-element': 'off',
      },
    },

    /**
     * client components
     */
    {
      files: ['**/*.client.jsx', '**/*.client.tsx'],
      rules: {
        'no-restricted-syntax': 'off',
      },
    },

    /**
     * typescript
     * - must come after jsx to turn off airbnb rules conflicted with typescript
     */
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      rules: {
        // allow empty interface (for React props)
        '@typescript-eslint/no-empty-interface': 'off',

        // allow not using positional arguments before the last used argument
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { args: 'after-used', ignoreRestSiblings: true },
        ],

        // allow typescript constructor parameter properties
        // see https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
        // e.g. constructor(private readonly xxxx: string) {}
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],

        // require return type
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],

        // allow class properties with no blank line inbetween
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true, exceptAfterOverload: true },
        ],

        // type must be imported as type
        '@typescript-eslint/consistent-type-imports': 'error',

        // require public/private/protected
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            ignoredMethodNames: ['render'],
            overrides: {
              constructors: 'no-public',
            },
          },
        ],

        // allow async event handler
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },

    /**
     * all
     * - turn off rules conflicted with prettier for all files
     * - add custom rules at last to make sure they aren't overridden
     */
    {
      files: ['**/*'],
      extends: ['prettier'],
      rules: {
        // allow _ in variable
        'no-underscore-dangle': 'off',

        // allow named exports without default export
        'import/prefer-default-export': 'off',

        // sort imports
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],

        // omit .ts .tsx in import statement
        // see https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            json: 'never',
          },
        ],
      },
    },
  ],
};
