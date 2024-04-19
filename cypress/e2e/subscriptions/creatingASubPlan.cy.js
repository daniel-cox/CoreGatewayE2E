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
    cy.get(".v-btn__content").contains("Add").click()
  })

  it("should create a subscription plan with random values based on pay frequency", () => {
    let counter = 1
    const testName = `Test Plan-${counter}`
    cy.get("input[name='planName']").type(testName)
    counter++

    //NOTE Billing Interval

    //NOTE Installments
    const randomInstallments = Math.floor(Math.random() * 12) + 1

    cy.get("input[name='recurrence-installments']").type(
      randomInstallments.toString()
    )

    const wholeNumber = Math.floor(Math.random() * 100) + 1
    const decimalNumber = "00"
    const randomAmount = `${wholeNumber}.${decimalNumber.toString()}`

    cy.get("input[name='billing-recurrence-amount']").clear().type(randomAmount)

    // Choose pay frequency
    const randomPayFrequency =
      payFrequency[Math.floor(Math.random() * payFrequency.length)]

    // Click on the selected pay frequency
    cy.get(".v-select__selections").contains(randomPayFrequency).click()

    // Logic based on pay frequency
    if (randomPayFrequency === "Monthly") {
      const randomDayOfMonth = Math.floor(Math.random() * 30) + 1
      cy.contains(".v-select__menu", randomDayOfMonth.toString()).click()
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
      cy.contains(".v-select__menu", randomMonth).click()
      cy.contains(".v-select__menu", randomDayOfYear).click()
    } else if (randomPayFrequency === "Daily") {
      const randomValue = Math.random()
      const clickProbability = 0.5

      if (randomValue < clickProbability) {
        cy.get('input[name="subscription-disable-proration"]').click()
      }

      cy.get(
        "button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default.secondary"
      )
        .contains("Save Changes")
        .click()
    } else if (randomPayFrequency === "Weekly") {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]
      if (randomValue < clickProbability) {
        cy.get('input[name="subscription-disable-proration"]').click()
        cy.get(
          "button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default.secondary"
        )
          .contains("Save Changes")
          .click()
      } else if (randomValue > clickProbability) {
        cy.get(
          "button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default.secondary"
        )
          .contains("Save Changes")
          .click()
      }
    }
  })
})
