beforeEach(() =>{
    cy.login('dctesting2', 'Spring2024!')
})
it('checks if the login was successful', () => {
    cy.contains('/Dashboard')
})