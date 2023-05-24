/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */

module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  pluginSearchDirs: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  importOrderMergeDuplicateImports: true,
  importOrder: [
    "^react$",
    "^react-native",
    "^react",
    "<THIRD_PARTY_MODULES>",
    "",
    "^components",
    "^hooks",
    "^utils",
    "^types",
  ]
};