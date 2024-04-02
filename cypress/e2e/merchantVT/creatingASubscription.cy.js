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
  })
})
