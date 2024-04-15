const payFrequency = ["Daily", "Weekly", "Monthly", "Yearly"]

describe("Creating a subscription plan with random values", () => {
  beforeEach(() => {
    cy.visit("https://testing.cgatewaydev.link/login")

    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()

    cy.contains("button", "Daniel Cox").should("exist")
  })

  beforeEach(() => {
    cy.visit("/plans")
    cy.get(".v-btn__content").contains("Add").click() // Corrected the selector to match the button class
  })

  it("should create a subscription plan with random values based on pay frequency", () => {
    // Randomly choose pay frequency
    const randomPayFrequency =
      payFrequency[Math.floor(Math.random() * payFrequency.length)]

    // Select the pay frequency in the dropdown
    cy.get(".v-select__selections")
    // Click on the selected pay frequency
    cy.get(".v-select__selections").contains(randomPayFrequency).click()

    // Wait for the dropdown to be fully visible and interactable
    cy.get(".v-select__selections").should("be.visible")

    // Logic based on pay frequency
    if (randomPayFrequency === randomPayFrequency) {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]
      const randomDayOfWeek =
        daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)]
      cy.get(randomDayOfWeek).click({ force: true })
    } else if (randomPayFrequency === "Monthly") {
      const randomDayOfMonth = Math.floor(Math.random() * 30) + 1
      cy.get(".v-select__selections")
        .contains(randomDayOfMonth.toString())
        .click({ force: true })
    } else if (randomPayFrequency === "Yearly") {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      const randomMonth = months[Math.floor(Math.random() * months.length)]
      const randomDayOfYear = Math.floor(Math.random() * 30) + 1
      cy.get(".v-select__selections")
        .contains(randomMonth)
        .click({ force: true })
      cy.get(".v-select__selections")
        .contains(randomDayOfYear.toString())
        .click({ force: true })
    }
  })
})
