module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  globals: {
    "API_HOST": "testing-url"
  }
};
