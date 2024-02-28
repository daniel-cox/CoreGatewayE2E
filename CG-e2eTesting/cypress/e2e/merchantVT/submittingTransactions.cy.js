describe("submitting a transaction", () => {
  beforeEach(() => {
    cy.login({ username: "dctesting2", password: "Spring2024!" });
  });

  it("should allow a user to process a transaction", () => {
    cy.wait(300)
    cy.visit("/virtual-terminal");

    cy.get('input[name="cc-payment-method-number"]')
      .click()
      .type("4000000000000002");

    cy.get('.v-input__slot').click();
    cy.get('.v-menu').contains('2026').click({ multiple: true });
    cy.get('v-text-field__slot')
     cy.get('.v-select__selections').should('contain', '2026');


    cy.get(".v-text-field__slot");
    cy.get('input[name="amount"]').click().type("5.00");
    cy.contains("button", "Submit").click();
  });
});
