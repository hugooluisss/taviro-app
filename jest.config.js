module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^react-native-qrcode-svg$': '<rootDir>/__mocks__/QRCode.js',
    '^react-native-share$': '<rootDir>/__mocks__/ReactNativeShare.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-navigation|@react-native-async-storage|react-native-screens|react-native-safe-area-context|react-native-qrcode-svg|react-native-svg)/)',
  ],
};
