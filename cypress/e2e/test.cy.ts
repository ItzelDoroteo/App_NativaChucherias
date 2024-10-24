describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('#container').should('contain', 'Ready to create an app?');
  })
})