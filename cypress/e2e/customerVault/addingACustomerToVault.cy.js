describe("add a customer to the vault", () => {
  beforeEach(() => {
    cy.visit("https://testing.cgatewaydev.link/login")

    cy.get("#username").type("dctesting2")
    cy.get("#password").type("Spring2024!")
    cy.contains("button", "Login").click()

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

  it("should add a customer to the vault", () => {
    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length)
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length)

    const randomFirstName = firstNames[randomFirstNameIndex]
    const randomLastName = lastNames[randomLastNameIndex]

    cy.wait(3000)

    cy.visit("https://testing.cgatewaydev.link/customers")

    cy.contains("a", "Add").click()

    // Customer Billing Details Input:
    cy.wait(500)
    cy.get('input[name="customer-address-company"]')
      .should("be.visible")
      .type("Test Company")
    cy.get('input[name="customer-address-first-name"]').type(randomFirstName)
    cy.get('input[name="customer-address-last-name"]').type(randomLastName)
    cy.get('[id$="-address1"]').type("123 Ribbon Ln")
    cy.get('[id$="-address2"]').type("suite 983b")
    cy.get('[id$="-city"]').type("Nashville")

    cy.wait(500)

    // State Selection
    cy.get("div[role='button']").click({ multiple: true })
    cy.get("v-select__slot")
    cy.get(".v-list-item__title")
      .should("contain", "state")
      .click({ force: true })

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
