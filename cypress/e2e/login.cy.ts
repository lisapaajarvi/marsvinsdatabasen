// Detta är ett test som går igenom ett inloggnings- och utloggningsflöde.

// Olika typer av selektorer används, t.ex. id, text (med .contains) och cypress eget "data-cy".
// Klasser går också att använda som selektorer, men det är mer osäkert eftersom det framförallt används till styling och därför ofta ändras. 
// Då kan även testerna behöva ses över när stylingen ändras. 
// Cypress rekommenderar "data-cy", eftersom det endast används till detta ändamål. 
// När själva texten är viktig och inte ska ändras rekommenderas att använda text och .contains 



describe('login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('logs in', () => {
        // hämtar ett element med texten "Logga in" från bodyn och klickar på det
        cy.get('body').contains('Logga in').click(); 
        // kontrollerar att url:en är /login, dvs att vi har förflyttats till loginsidan
        cy.location('pathname').should('eq', '/login') 
        //hämtar elementet med id "email", alltså inputfältet för email, och skriver in mailadressen för en användare
        cy.get('#email').type('tristan@marsvin.nu')
        //hämtar lösenordsfältet på samma sätt och skriver in lösenordet
        cy.get('#password').type('marsviiin')
        // hämtar submitknappen på samma sätt och klickar på den
        cy.get('#submit').click()
        // kontrollerar att url:en är "/", dvs att vi har redirectats till startsidan efter inloggning
        cy.location('pathname').should('eq', '/')
    });

    it('checks available buttons when logged in', () => {
        // kontrollerar att "logga in" knappen inte är synlig
        cy.get('body').contains('Logga in').should('not.be.visible'); 
        // kontrollerar att "registrera dig" knappen inte är synlig
        cy.get('body').contains('Registrera dig').should('not.be.visible'); 
        // kontrollerar att "logga ut" knappen är synlig
        cy.get('body').contains('Logga ut').should('be.visible'); 
    });
    it('checks that user avatar is visible', () => {
        // kontrollerar att användarens avatar är synlig
        cy.get('[data-cy="header-avatar"]').should('be.visible'); 
    });
});

describe('logout', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('logs out', () => {
        // hämtar ett element med texten "Logga ut" från bodyn och klickar på det
        cy.get('body').contains('Logga ut').click(); 
        // kontrollerar att url:en är "/", dvs att vi befinner oss på startsidan
        cy.location('pathname').should('eq', '/')
    });

    it('checks ui after logout', () => {
        // kontrollerar att "logga in" knappen är synlig
        cy.get('body').contains('Logga in').should('be.visible'); 
        // kontrollerar att "registrera dig" knappen är synlig
        cy.get('body').contains('Registrera dig').should('be.visible'); 
        // kontrollerar att "logga ut" knappen inte syns
        cy.get('[data-cy="logout-button"]').should('not.exist'); 
        // kontrollerar att användarens avatar inte längre syns
        cy.get('[data-cy="header-avatar"]').should('not.exist'); 
        // kontrollerar att "Logga in för att lägga till" knappen är synlig
        cy.get('[data-cy="login-to-add-button"]').should('be.visible'); 
        // kontrollerar att "Lägg till marsvin"-knappen inte finns
        cy.get('[data-cy="add-button"]').should('not.exist');
    });
});
