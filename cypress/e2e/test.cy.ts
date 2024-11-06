describe('My First Test', () => {
  it('Visits the app root url and checks for product list', () => {
    cy.visit('/');
    cy.intercept('GET', '/products').as('getProducts');
    cy.wait('@getProducts'); 
    // Espera a que el contenedor esté visible
    cy.get('#container', { timeout: 20000 }).should('be.visible');
    
    // Verifica que el contenedor contenga el texto esperado
    cy.get('#container').should('contain', 'Productos más vendidos');
  });
});
