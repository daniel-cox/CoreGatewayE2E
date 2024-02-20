const { defineConfig } = require("cypress");

module.exports = {
  // ...rest of the Cypress project config
  projectId: "x865nf",

  e2e: {
    baseUrl: 'https://testing.cgatewaydev.link/login'
  }

};
