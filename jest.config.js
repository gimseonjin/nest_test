var fs = require('fs');

var configFile = fs.readFileSync('.swcrc', 'utf8');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '!/(.*)$': '<rootDir>/test/$1',
  },
  testRegex: '.*\\.(spec|test|e2e-spec)\\.ts$',
  transform: {
    '.+\\.(t|j)s$': ['@swc/jest', { ...JSON.parse(configFile) }],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/(main|migration).ts',
    '!src/(newrelic|sentry).interceptor.ts',
    '!src/tenant-contextid.strategy.ts',
    '!src/http/user.decorator.ts',
    '!src/http/interceptor/file.upload.interceptor.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
