module.exports = {
  // ...rest of the Cypress project config
  projectId: "t5zg38",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://testing.cgatewaydev.link"
  }
};