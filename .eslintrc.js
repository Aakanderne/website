/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
  ].map(require.resolve),
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    tailwindcss: {
      callees: ['cn'],
      config: './tailwind.config.ts',
    },
  },
  overrides: [
    {
      files: [
        './src/app/**/{page,layout,loading,not-found,robots}.{ts,tsx}',
        'next.config.mjs',
        './src/middleware.ts',
        './*.config.{js,ts,mjs}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.{js,ts,jsx,tsx,mjs,cjs}'],
      extends: ['plugin:sonarjs/recommended'],
    },
    {
      files: ['*.{jsx,tsx}'],
      rules: {
        'sonarjs/cognitive-complexity': ['error', 15],
      },
    },
    {
      files: ['*.{ts,tsx}'],
      extends: ['plugin:tailwindcss/recommended'],
    },
  ],
  ignorePatterns: ['node_modules/', 'out/', 'public/', '.next/'],
};
