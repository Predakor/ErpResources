const config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@features/(.*)$': '<rootDir>/src/app/features/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
    '\\.html$': 'html-loader-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$))'],
};
export default config;
