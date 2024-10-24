describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    // Espera a que el contenedor esté visible
    cy.get('#container', { timeout: 20000 }).should('be.visible');
    cy.get('#container').should('contain', 'Ready to create an app?');
  });
});
