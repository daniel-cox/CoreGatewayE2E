describe('add a customer to the vault', () => {
    beforeEach(() => {
        cy.intercept('POST', '/login').as('loginRequest');
        cy.visit('https://testing.cgatewaydev.link/login');
        cy.get('#username').type('dctesting2');
        cy.get('#password').type('Spring2024!');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');
    });

    it('should add a customer to the vault', () => {
        cy.wait(5000);
        cy.visit('https://testing.cgatewaydev.link/customers');
        //Customer billing details
        cy.get('a[href="/customers/new"]').click();
        cy.get('input[name="customer-address-company"]').type('Test Company') ;
        cy.get('input[name="customer-address-first-name"]').type('John') ;
        cy.get('input[name="customer-address-last-name"]').type('Doe') ;
        cy.get('input[name="customer-address-email"]').type('test@test.com') ;
        cy.get('input[name="customer-address-address1"]').type('123 Mockingbird ln');
        cy.get('input[name="customer-address-city"]').type('Nashville');
        cy.get('#v-select__selections')
        cy.get('#input-705').click()
        cy.get('#list-item-723-42').should('be.visible').click()
        cy.get('input[name="customer-address-zip"]').type('37205') ;
        cy.get('input[name="customer-address-phone"]').type('123-123-1234');

        //Customer card details
        cy.get('input[name="nickname"]').type('Main Card');
        cy.get('input[name="cc-payment-method-number"]').type('4000000000000002') ;
        cy.get('#input-145').type('{enter}{downarrow}{downarrow}{downarrow}{enter}') ;
        cy.get('button[type="submit"]').click();
    })
})
