describe("submitting a transaction", () => {
  beforeEach(() => {
    cy.intercept("POST", "/login").as("loginRequest")
    cy.visit("https://testing.cgatewaydev.link/login")

    // User Authentication:
    cy.get("#username", { timeout: 5000 }).type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.get('button[type="submit"]').click()

    cy.wait("@loginRequest")
  })

  it("should allow a user to process a transaction", () => {
    cy.wait(3000)
    cy.visit("https://testing.cgatewaydev.link/virtual-terminal")

    // Selecting payment method number
    cy.get('input[name="cc-payment-method-number"]').type("4000000000000002")
    cy.wait(500)

    // Selecting Exp Year
    cy.contains("label", "Exp Year").parent(".v-select__slot").click()
    cy.contains("div.v-list-item__content", "2027").click()
    cy.contains("button", "Submit").click()
    // Adding additional transactions
    cy.get(
      'div[role="button"][aria-haspopup="listbox"][aria-expanded="false"][aria-owns="list-126"]'
    ).click()
    cy.contains("div.v-list-item__title", "First Data Nashville").click()
    cy.get("[name='amount']")
      .type("10.00")
      .should("have.value", "10.00")
      .wait(300)
    cy.get('button[type="submit"]').click()

    cy.get(
      'div[role="button"][aria-haspopup="listbox"][aria-expanded="false"][aria-owns="list-126"]'
    ).click()
    cy.contains("div.v-list-item__title", "First Data Omaha").click()
    cy.get("[name='amount']")
      .type("10.00")
      .should("have.value", "10.00")
      .wait(300)
    cy.get('button[type="submit"]').click()

    cy.get(
      'div[role="button"][aria-haspopup="listbox"][aria-expanded="false"][aria-owns="list-126"]'
    ).click()
    cy.contains("div.v-list-item__title", "Tsys Testing").click()
    cy.get("[name='amount']")
      .type("10.00")
      .should("have.value", "10.00")
      .wait(300)
    cy.get('button[type="submit"]').click()
  })
})
