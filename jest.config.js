module.exports = {
  preset: 'jest-preset-angular',
  testMatch: ['**/*.spec.[tj]s'],
  collectCoverage: false,
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/jestSetup.ts'],
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  transform: {
  },
  verbose: true,
  globals: {
    'ts-jest': {
      'tsconfig': '<rootDir>/tsconfig.spec.json',
      'stringifyContentPathRegex': '\\.html$',
    },
  },
};
