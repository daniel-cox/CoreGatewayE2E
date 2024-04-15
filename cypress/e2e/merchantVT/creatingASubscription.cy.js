describe("submitting a transaction", () => {
  beforeEach(() => {
    cy.visit("https://testing.cgatewaydev.link/login")

    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()

    cy.contains("button", "Daniel Cox").should("exist")
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
