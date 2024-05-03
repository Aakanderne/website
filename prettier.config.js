const vercelPrettierConfig = require('@vercel/style-guide/prettier');

/** @type {import('prettier').Options} */
module.exports = {
  ...vercelPrettierConfig,
  bracketSpacing: true,
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
};
