// describe('Tab1 Component', () => {
//     beforeEach(() => {
//       cy.intercept('GET', 'https://backend-c-r-production.up.railway.app/products', {
//         fixture: 'products.json', // crea este archivo de ejemplo en cypress/fixtures/
//       }).as('getProducts');
  
//       cy.visit('/tab1'); // La ruta depende de como se configuro la ruta
//     });
  
//     it('should render the component and display products', () => {
//       // Verifica que la página se carga correctamente
//       cy.get('ion-page').should('exist');
      
//       // Se llama la API y se cargan los productos
//       cy.wait('@getProducts').then(() => {
//         // Verifica que los productos se muestran en el componente
//         cy.get('[data-testid="product-item"]').should('have.length.greaterThan', 0);
//       });
//     });
  
//     it('should handle API error gracefully', () => {
//       // Simula un error en la respuesta de la API
//       cy.intercept('GET', 'https://backend-c-r-production.up.railway.app/products', {
//         statusCode: 500,
//       }).as('getProductsError');
  
//       cy.visit('/tab1');
//       cy.wait('@getProductsError');
  
//       // verifica que el mensaje de error esté visible o que los productos no se muestren
//       cy.get('[data-testid="error-message"]').should('exist');
//     });
//   });
  