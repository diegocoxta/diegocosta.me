module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
    '@content/(.*)$': '<rootDir>/content/$1',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
};
