const { defineConfig } = require("cypress")
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    retries: 1,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    specPattern: "cypress/e2e/**/*.feature"
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report"
  }
});
