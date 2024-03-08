describe("submitting a transaction", () => {
  beforeEach(() => {
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
  })
})
