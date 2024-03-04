describe('Login', () => {
    it('should log in successfully', () =>{
        // Type into the first input field
        cy.get('#username').type('dctesting2');

        // Type into the second input field
        cy.get('#password').type('Spring2024!');

        cy.get('form').submit();

        cy.url().should('include', '/dashboard'); 
    });
});
