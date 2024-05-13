describe("Submitting a Customer Vault Transaction", () => {
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

  it("should allow a user to process a transaction", () => {
    cy.visit("/customers")
    cy.wait(5000)
    cy.visit("/customers/6c772757-fb34-49a9-a8f8-31afd833188e")
    cy.wait(5000)
    // charge page does not load in cypress, but loads if you visit the web page directly
    cy.visit(
      "/customers/6c772757-fb34-49a9-a8f8-31afd833188e/payment-methods/328bf7c0-78d4-493e-9cde-b70455b91eee/charge"
    )
    cy.wait(8000)
    cy.get("#input-").click().clear().type("500")
    cy.get('button[type="submit"]')
      .contains("Submit Payment")
      .click({ multiple: true })
  })
})
