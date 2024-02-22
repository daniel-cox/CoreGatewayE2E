describe('Merchant Login', () => {
    beforeEach(() => {
        cy.visit('https://testing.cgatewaydev.link/login'); 
        cy.wait(1000); 
        cy.get('#username').type('dctesting2');
        cy.get('#password').type('Spring2024');
        cy.get('form').submit();
        cy.wait(5000);
    });

    it('Should remain logged in', () => {
        cy.visit('https://testing.cgatewaydev.link/dashboard'); 
    });
});
