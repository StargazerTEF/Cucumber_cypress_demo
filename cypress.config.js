const { defineConfig } = require("cypress")
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  defaultCommandTimeout: 20000, pageLoadTimeout: 20000,
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/**/*.feature"
  },
});
