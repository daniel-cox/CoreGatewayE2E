describe("add a customer to the vault", () => {
  beforeEach(() => {
    cy.visit("https://testing.cgatewaydev.link/login")

    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()

    cy.contains("button", "Daniel Cox").should("exist")
  })

  it("should add a customer to the vault", () => {
    cy.wait(3000)

    cy.visit("https://testing.cgatewaydev.link/customers")

    // Initiate Customer Creation:
    cy.contains("a", "Add").click()

    // Customer Billing Details Input:
    cy.wait(500)
    cy.get('input[name="customer-address-company"]')
      .should("be.visible")
      .type("Test Company")
    cy.get('input[name="customer-address-first-name"]').type("John")

    // State Selection
    cy.get('div[role="button"]')
    cy.get('[id^="input-"]').should("be.visible").click({ force: true })
    cy.wait(1000)
    cy.get(".v-menu__content").should("be.visible")
    cy.contains(".v-list-item__title", "Tennessee").click()

    //Customer card details
    cy.get('input[name="nickname"]').type("Main Card")
    cy.get('input[name="cc-payment-method-number"]').type("4000000000000002")
    cy.wait(500)

    // CC Month selection
    cy.contains("label", "Exp Month").parent(".v-select__slot").click()
    cy.contains("div.v-list-item__content", "5").click()

    // CC Year selection
    cy.contains("label", "Exp Year").parent(".v-select__slot").click()
    cy.contains("div.v-list-item__content", "2027").click()
    cy.contains("button", "Submit").click() //submits the transaction to the vault
  })
})
