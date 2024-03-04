describe("submitting a transaction", () => {
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
  
    it("should allow a user to process a transaction", () => {
        cy.wait(300).visit("/virtual-terminal");

        cy.get('input[name="cc-payment-method-number"]')
            .click()
            .type("4000000000000002");

        // Define terminal options
        const terminalOptions = ['Elavon', 'First Data Nashville', 'First Data Omaha', 'Tsys testing'];

        // Loop through different terminal options
        terminalOptions.forEach((terminal) => {
            // Click on the terminal dropdown
            cy.get('.v-select__selections').click();
            cy.get('.v-input');
            // Click on the option containing the specified text
            cy.get('.v-list-item').contains(terminal).click();
        
            // Assert that the selected option is the one clicked
            cy.get('.v-select__selections').should('contain', terminal);

            // Add your additional test steps here (e.g., entering amount, submitting transaction, etc.)
            cy.get('input[name="amount"]').click().type("5.00");
            cy.contains("button", "Submit").click();
            cy.wait(5000).contains("Transaction Processed");
            cy.wait(500).contains('button', 'Close').click();
        
            // Go back to the virtual terminal for the next iteration
            cy.visit("/virtual-terminal");
        });
        
    });
});
