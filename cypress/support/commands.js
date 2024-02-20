// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('https://testing.cgatewaydev.link/login');
        cy.get('#username').clear().type(username); // Use the username variable here
        cy.get('#password').clear().type(password); // Use the password variable here
        cy.contains('Login').click();
        cy.url().should('include', '/', { timeout: 5000 });
    });
});
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })