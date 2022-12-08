describe('overview', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should have only one h1', () => {
        cy.get('body').find('h1').should('have.length', 1);
    });

    it('should have a header', () => {
        cy.get('body').find('header').should('be.visible');
    });
})