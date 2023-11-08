module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura", "text-summary"],
  collectCoverageFrom: [
    "src/components/**",
    // "src/features/**",
    "src/utils/**",
    // "src/App.jsx",
    // "src/main.jsx",
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
