describe('login', () => {
    it('logs in', () => {
        cy.visit('/login');
        cy.get('[data-cy="email"]').type('tristan@marsvin.nu')
        cy.get('[data-cy="password"]').type('marsviiin')
        cy.get('form').submit()
        cy.location('pathname').should('eq', '/')
    });
});

describe('edit guinea pig info', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('checks that the page has at least five entries', () => {
        cy.get('body').find('h3').should('have.length.above', 5);
    });
    it('changes name of guinea pig', () => {
        cy.get('h3').contains('Rufus').click();
        cy.get('[data-cy="edit-name"]').clear().type('Plutten');
        cy.contains('Spara').click();
        cy.get('h3').contains('Plutten').should('exist');
        cy.get('h3').contains('Rufus').should('not.exist');
    });
});

describe('add and remove guinea pigs', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('adds a new guinea pig to the database', () => {
        cy.contains('Lägg till marsvin').click();
        cy.get('[data-cy="new-name"]').type('Fluffis');
        cy.get('[data-cy="new-notes"]').type('Ett väldigt fluffigt marsvin.');
        cy.contains('Spara').click();
        cy.get('h3').contains('Fluffis').should('exist');
    });
    it('removes the new guinea pig from database', () => {
        cy.get('h3').contains('Fluffis').click();
        cy.contains('Ta bort').click();
        cy.get('h3').contains('Fluffis').should('not.exist');
    });
});