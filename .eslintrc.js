module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['react', 'react-native', 'prettier'],
  rules: { 'prettier/prettier': ['error', { endOfLine: 'auto' }] }
};
