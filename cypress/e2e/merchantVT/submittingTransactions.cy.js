describe("submitting a transaction", () => {
  beforeEach(() => {
<<<<<<< HEAD
    cy.visit("https://testing.cgatewaydev.link/login")

    // User Authentication:
    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()

    cy.contains("button", "Daniel Cox").should("exist")
  })

  it("should allow a user to process a transaction", () => {
    cy.visit("https://testing.cgatewaydev.link/virtual-terminal")
    cy.contains("h3.mb-3", "Billing").should("be.visible")

    cy.get('[id$="-company"]').type("Mockup Company")
    cy.get('[id$="-firstName"]').type("John")
    cy.get('[id$="-lastName"]').type("Doe")
    cy.get('[id$="-address1"]').type("123 Ribbon Ln")
    cy.get('[id$="-address2"]').type("suite 983b")
    cy.get('[id$="-city"]').type("Nashville")

    cy.get('[aria-owns^="list-"]').contains("State").click({ force: true })

    const listItems = document.querySelectorAll(".v-list-item__content")

    // Loop through the list of states
    // Loop through the state options to find and click "Tennessee"
    cy.get(".v-list-item__content").each((item) => {
      const stateName = item.text().trim()
      if (stateName === "Tennessee") {
        cy.wrap(item).click()
      }
    })

    cy.get('[id$="-zip"]').type("37205")
    cy.get('[id$="-phone"]').type("123-123-1234")
    cy.get(".link-text")
      .contains("Use different shipping information")
      .should("be.visible")
      .click()

    cy.get('input[name="cc-payment-method-number"]').type("4000000000000002")
    //select month
    cy.get(".v-select__selection").contains(4).type(6)
    cy.get(".v-list-item__title").contains(6).click()
    //select year
    cy.get(".v-select__selection").contains(2024).type(2024)
    cy.get(".v-list-item__title").contains(2026).click()

    //input cvv
    cy.get(".cc-payment-method-cvv").type(999).click()

    cy.get(".custom-field-text")
      .contains("Drop Off Location")
      .type("Leave in office door")

    cy.get('input[name="amount"]').type("5.00")
    cy.get('button[type="submit"]').click()
=======
    cy.intercept("POST", "/login").as("loginRequest")
    cy.visit("login")

    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.get('button[type="submit"]').click()

    cy.wait("@loginRequest").then(() => {})
  })

  it("should allow a user to process a transaction", () => {
    const terminalOptions = [
      "Elavon",
      "First Data Nashville",
      "First Data Omaha",
      "Tsys testing",
    ]

    terminalOptions.forEach((terminal) => {
      cy.visit("/virtual-terminal")

      //Customer Billing Details
      cy.wait(5000)
        .get('input[name="customer-address-company"]')
        .type("Mock Company")
      cy.get('input[name="customer-address-first-name"]').type("John")
      cy.get('input[name="customer-address-last-name"]').type("Doe")
      cy.get('input[name="customer-address-email"]').type("testing@test.com")
      cy.get('input[name="customer-address-address1"]').type(
        "123 Westwind Drive"
      )
      cy.get('input[name="customer-address-address2"]').type("Suite 119")
      cy.get('input[name="customer-address-city"]').type("Nashville")
      cy.get('input[name="customer-address-zip"]').type("37250")
      cy.get('input[name="customer-address-phone"]').type("1231231234")
      //End Customer Billing Details

      cy.get('input[name="cc-payment-method-number"], #input-')
        .type("4000000000000002")
        .wait(500)

      cy.get(".v-select__selections").contains("Elavon").click()

      cy.get(".v-list-item__title").contains(terminal).click() // Selects the desired terminal option

      // cy.get('input[name='cc-payment-method-cvv']')
      //     .type('999');

      cy.get('input[name="amount"]').clear().type("5")
      cy.log("Submit button found")
      cy.get('button[type="submit"]').click()

      cy.wait(4000)
      cy.get(".v-card.v-sheet.theme--light")
        .contains(".v-card__title", "Transaction Failed")
        .should("not.exist")
        .log("The Transaction has failed")
        .then(() => {
          cy.get(".v-btn__content").contains("Close").click()
        })
    })
>>>>>>> a03052b087045011eb587eac829aaac88fafbac3
  })
})
