describe('Tab1 Component', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:5000/products', {
        fixture: 'products.json', // crea este archivo de ejemplo en cypress/fixtures/
      }).as('getProducts');
  
      cy.visit('/tab1'); // La ruta depende de cómo hayas configurado tus rutas
    });
  
    it('should render the component and display products', () => {
      // Verifica que la página se carga correctamente
      cy.get('ion-page').should('exist');
      
      // Espera que se llame la API y se carguen los productos
      cy.wait('@getProducts').then(() => {
        // Verifica que los productos se muestran en el componente
        cy.get('[data-testid="product-item"]').should('have.length.greaterThan', 0);
      });
    });
  
    it('should handle API error gracefully', () => {
      // Simula un error en la respuesta de la API
      cy.intercept('GET', 'http://localhost:5000/products', {
        statusCode: 500,
      }).as('getProductsError');
  
      cy.visit('/tab1');
      cy.wait('@getProductsError');
  
      // Aquí podrías verificar que el mensaje de error esté visible o que los productos no se muestren
      cy.get('[data-testid="error-message"]').should('exist');
    });
  });
  