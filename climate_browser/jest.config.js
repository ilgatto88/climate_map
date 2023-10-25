module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura", "text-summary"],
  collectCoverageFrom: ["src/**", "!src/store.js"],
  testEnvironment: "jest-environment-jsdom",
};
