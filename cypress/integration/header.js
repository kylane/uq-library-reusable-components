/// <reference types="cypress" />

describe('UQ Header', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.injectAxe();
    })
    context('Header', () => {
        it('Header is visible without interaction at 1280', () => {
            cy.viewport(1280, 900);
            cy.get('uq-header').shadow().find('div.nav-global').find('.search-toggle__button').should('be.visible');
            cy.get('uq-header').shadow().find('div.nav-global').find('div.logo').should('be.visible');
            cy.get('uq-header').shadow().find('div.nav-global').find('nav.menu-global ul').find('li').should('have.length', 9);
            cy.get('uq-header').shadow().find('div.nav-global').find('nav.menu-global ul').should('be.visible').find('li').should('have.length', 9);

            cy.get('uq-header').shadow().find('div.nav-global').find('.search-toggle__button').click();
            cy.wait(1200);
            cy.get('uq-header').shadow().find('div.nav-search').should('be.visible');
            cy.get('uq-header').shadow().find('div.nav-search').should('contain', 'What are you looking for?');
            cy.get('uq-header').shadow().find('div.nav-search').should('contain', 'Search this website (library.uq.edu.au)');
            cy.get('uq-header').shadow().find('div.nav-search').find('input.search-query__submit').should('be.visible');
            cy.get('uq-header').shadow().find('div.nav-search').find('input#edit-as_sitesearch-off.form-radio').click();

        });

        it('Header passes accessibility', () => {
            cy.viewport(1280, 900);
            cy.checkA11y('uq-header', {
                reportName: 'Header',
                scopeName: 'Accessibility',
                includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
            });
        });
    });
});
