module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura", "lcov", "text-summary"],
  collectCoverageFrom: ["src/**", "!src/store.js"],
};
