describe('submitting a transaction', () => {
    beforeEach(() => {
        cy.login({ username: 'dctesting2', password: 'Spring2024!' });
    });

    it('should allow a user to process a transaction', () =>{
        cy.visit('https://testing.cgatewaydev.link/virtual-terminal');
        cy.url().should('include', 'https://testing.cgatewaydev.link/virtual-terminal');
        cy.get('input[name="cc-payment-method-number"]').type('4000000000000002');
        cy.get('#input-274').type('{enter}{downarrow}{downarrow}{downarrow}{enter}');
        cy.get('#list-item-600-4').click(); 
        cy.get('.v-menu__content').click().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}'); 
        cy.get('.v-menu__content').type('{enter}');
        cy.get('input[name="amount"]').type('5.00')
        cy.get('button[type="submit"]').click();
    });
});
