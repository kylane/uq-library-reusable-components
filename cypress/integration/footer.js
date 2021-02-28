/// <reference types="cypress" />

context('Footer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    })

    it('Footer is visible without interaction at 1280', () => {
        cy.viewport(1280, 900);
        cy.get('uq-footer').shadow().find('footer').should('contain', 'UQ acknowledges the Traditional Owners and their custodianship of the lands on which UQ is situated.');
        cy.get('uq-footer').shadow().find('a').should('have.length', 10);
    });
})
