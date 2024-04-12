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
    "Matt",
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
    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length)
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length)

    const randomFirstName = firstNames[randomFirstNameIndex]
    const randomLastName = lastNames[randomLastNameIndex]

    cy.visit("https://testing.cgatewaydev.link/virtual-terminal")
    cy.contains("h3.mb-3", "Billing").should("be.visible")

    const terminalOptions = [
      "Elavon",
      "First Data Nashville",
      "First Data Omaha",
      "TSYS TESTING",
    ]
    cy.wait(5000)
    terminalOptions.forEach((processorName, index) => {
      cy.task("log", `${index} Processing transaction with ${processorName}`)
      //NOTE - places an order for each processor
      let vSlots = document.querySelectorAll("v-select__slot")
      cy.task("log", `v-slots: ${vSlots}`)
      cy.writeFile(
        `cypress/downloads/vSlots${index}.txt`,
        `log, ${vSlots}v-slots: [object NodeList]`
      )
      cy.wait(1000)

      //NOTE - write vslots to a txt file
      // let vSlotsString = JSON.stringify(vSlots)
      // cy.writeFile("cypress/downloads/vSlots.txt", vSlotsString)

      // write the vSlots array to a .txt file that is stored in 'cypress/downloads' folder
      cy.task("log", `v-slots: ${vSlots}`)

      cy.get('[id$="-company"]').type("Mockup Company")
      cy.get('[id$="-firstName"]').type(randomFirstName)
      cy.get('[id$="-lastName"]').type(randomLastName)
      cy.get('[id$="-address1"]').type("123 Ribbon Ln")
      cy.get('[id$="-address2"]').type("suite 983b")
      cy.get('[id$="-city"]').type("Nashville")

      cy.get('[aria-owns^="list-"]').contains("State").click({ force: true })

      const listItems = document.querySelectorAll("v-list-item__content")

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

      // cy.get(".v-select__slot")
      //   .contains("United States")
      //   .should("be.visible")
      //   .click()

      cy.get(".v-input__control").each((item) => {
        const countryName = item.text().trim()
        if (countryName === "United States") {
          cy.wrap(item).click()
        }
      })

      cy.get('input[name="cc-payment-method-number"]').type("4000000000000002")
      //select month
      cy.get(".v-select__selection").contains(4).type(6)
      cy.get(".v-list-item__title").contains(6).click({ force: true })
      //select year
      cy.get(".v-select__selection").contains(2024).type(2024)
      cy.get(".v-list-item__title").contains(2026).click({ force: true })

      //input cvv
      cy.get(".v-text-field__slot").contains("CVV")
      cy.get('input[name="cc-payment-method-cvv"]').clear().type(999).click()

      // Click the dropdown to open the options
      cy.get(".v-select__slot").eq(index).click()

      // Wait for the dropdown options to appear
      cy.get(".v-list-item__content").should("be.visible")

      cy.get('label[for^="input-"]').each((item) => {
        const cardProcessor = item.text()
        if (cardProcessor === processorName) {
          cy.wrap(item).click()
        }
      })

      // Clear and type into the amount input field
      cy.get('input[name="amount"]')
        .clear({ force: true })
        .type("5.00", { force: true })

      cy.get('button[type="submit"]').click()
      cy.wait(3000)
      cy.get(".v-btn").contains("Close").click()
    })
  })
})
