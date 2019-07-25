module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  globals: {
    "API_HOST": "testing-url"
  },
  rootDir: '..',
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/style-mock.ts",
    "@(components|containers|services|state)/(.*)": "<rootDir>/src/$1/$2",
    "@models": "<rootDir>/models/"
  },
  snapshotSerializers: [ "preact-render-spy/snapshot" ]
};
