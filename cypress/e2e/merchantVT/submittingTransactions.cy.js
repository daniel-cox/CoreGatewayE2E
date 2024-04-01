describe("submitting a transaction", () => {
  beforeEach(() => {
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
  })
})
