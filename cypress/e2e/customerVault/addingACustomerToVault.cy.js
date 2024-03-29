describe("add a customer to the vault", () => {
  // General explanation: This test suite verifies the functionality of adding a new customer to the vault within your application.

  beforeEach(() => {
    cy.intercept("POST", "/login").as("loginRequest");
    cy.visit("https://testing.cgatewaydev.link/login");

    // User Authentication:
    cy.get("#username").type("dctesting2");
    cy.get("#password").type("Spring2024!");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    //Waits for the login process to complete by checking the status of the request.
  });

  it("should add a customer to the vault", () => {
    cy.wait(3000);

    cy.visit("https://testing.cgatewaydev.link/customers");

    // Initiate Customer Creation:
    cy.contains("a", "Add").click();
    cy.wait(3000);
    // Customer Billing Details Input:
    cy.get('input[name="customer-address-company"]').type("Test Company");
    cy.get('input[name="customer-address-first-name"]').type("John");

    // State Selection
    cy.get('div[role="button"]');
    cy.get('input[id="input-173"]').should("be.visible").click({ force: true });
    cy.wait(1000);
    cy.get(".v-menu__content").should("be.visible");
    cy.contains(".v-list-item__title", "Tennessee").click();

    //Customer card details
    cy.get('input[name="nickname"]').type("Main Card");
    cy.get('input[name="cc-payment-method-number"]').type("4000000000000002");
    cy.wait(500);

    // CC Month selection
    cy.contains("label", "Exp Month").parent(".v-select__slot").click();
    cy.contains("div.v-list-item__content", "5").click();

    // CC Year selection
    cy.contains("label", "Exp Year").parent(".v-select__slot").click();
    cy.contains("div.v-list-item__content", "2027").click();
    cy.contains("button", "Submit").click(); //sumits the transaction to the vault
  });
});
