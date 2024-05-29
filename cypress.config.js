module.exports = {
  // ...rest of the Cypress project config
  projectId: "t5zg38",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Logging setup

      on("task", {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
    downloadsFolder: "cypress/downloads",
    baseUrl: "https://testing.cgatewaydev.link",
    experimentalSessionSupport: true,
  },
}
