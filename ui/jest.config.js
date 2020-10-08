module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testMatch: ["<rootDir>/__tests__/steps/WelcomeSayu\\.test\\.jsx"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|cypress|__mocks__)[/\\\\]",
  ],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMocks.ts",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverageFrom: ["**/*.{js,jsx}", "!**/node_modules/**"],
  moduleDirectories: ["node_modules", "."],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
