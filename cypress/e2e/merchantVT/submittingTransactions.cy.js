describe("submitting a transaction", () => {
  beforeEach(() => {
    cy.visit("https://testing.cgatewaydev.link/login")

    // User Authentication:
    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()
    cy.wait(500)
    cy.contains("button", "Daniel Cox").should("exist")
  })

  const firstNames = [
    "John",
    "Jane",
    "Sally",
    "Bob",
    "Mark",
    "David",
    "Sarah",
    "Brett",
    "Daniel",
  ]

  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
  ]

  const terminalOptions = [
    "Elavon",
    "First Data Nashville",
    "First Data Omaha",
    "TSYS TESTING",
  ]

  Cypress._.each(terminalOptions, (terminal, index) => {
    it(`should allow a user to process a transaction with ${terminal}`, () => {
      cy.visit("https://testing.cgatewaydev.link/virtual-terminal")
      cy.wait(2000)
      const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length)
      const randomLastNameIndex = Math.floor(Math.random() * lastNames.length)

      const randomFirstName = firstNames[randomFirstNameIndex]
      const randomLastName = lastNames[randomLastNameIndex]
      cy.wait(2000)
      cy.visit("/virtual-terminal")
      cy.contains("h3.mb-3", "Billing").should("be.visible")

      cy.wait(2000)

      // Input biling details
      cy.get('[id$="-company"]').type("Mockup Company")
      cy.get('[id$="-firstName"]').type(randomFirstName)
      cy.get('[id$="-lastName"]').type(randomLastName)
      cy.get('[id$="-address1"]').type("123 Ribbon Ln")
      cy.get('[id$="-address2"]').type("suite 983b")
      cy.get('[id$="-city"]').type("Nashville")

      const listItems = document.querySelectorAll("v-list-item__content")

      //select Tennessee in state dropdown
      // Click on the state dropdown to open the menu
      cy.get("div[data-v-09c73962]").contains("State").click({ force: true })

      // Wait for the dropdown menu to open
      cy.get(".v-menu__content").should("be.visible")

      // Select 'Tennessee' from the dropdown menu
      cy.contains(".v-list-item__title", "Tennessee").click()

      cy.get('[id$="-zip"]').type("37205")
      cy.get('[id$="-phone"]').type("123-123-1234")
      // cy.get(".link-text")
      //   .contains("Use different shipping information")
      //   .should("be.visible")
      //   .click()

      //NOTE create tests to check shipping fields

      //select United States in the country dropdown
      cy.get(".v-input__control").each((item) => {
        const countryName = item.text().trim()
        if (countryName === "United States") {
          cy.wrap(item).click()
        }
        cy.get(".v-input__control")
      })

      cy.get('input[name="cc-payment-method-number"]').type("4000000000000002")
      //select month
      cy.get(".v-select__selection").contains(4).type(6)
      cy.get(".v-list-item__title").contains(6).click({ force: true })

      //input cvv
      cy.get(".v-text-field__slot").contains("CVV")
      cy.get('input[name="cc-payment-method-cvv"]').clear().type(999).click()

      cy.get(".processor-terminal-dropdown").click()
      cy.get(`#processor-${index + 1}`).click()
      cy.wait(5000)

      //input dollar amount
      cy.get('input[name="amount"]')
        .clear({ force: true })
        .type("5.00", { force: true })
      //submit Order
      cy.get('button[type="submit"]').click()
      cy.wait(3000)
      cy.get(".v-btn").contains("Close").click()
    })
  })
})
