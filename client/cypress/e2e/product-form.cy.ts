describe('Product Create', () => {
  it('should log in and create an order', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name=email]').type('admin@gmail.com');
    cy.get('input[name=password]').type('123456');
    cy.get('button[type=button]').click();

    cy.url().should('not.include', '/login');
    cy.visit('http://localhost:3000/product/create');

    cy.get('input[name=code]').type('TSP');
    cy.get('input[name=name]').type('Test Product');
    cy.get('input[name=price]').type('50000');
    cy.get('input[name=stock]').type('10');

    cy.get('button[id=submit]').click();
    cy.get('button[id=close]').click();
  });
});
