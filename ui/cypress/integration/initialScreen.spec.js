describe("Enter and record pain and symptoms", function () {
  it("Enter and record pain and symptoms", () => {
    cy.visit("/");
    cy.contains("Registra síntomas aquí").click();
    cy.contains("Duele un poco más").click();
    cy.contains("Duele un poco más");
    cy.contains("¿Tienes otros síntomas?");
    cy.contains(" Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este.");

    cy.get("#Cansancio").siblings('[role="slider"]').type('{rightarrow}'.repeat(3));
    cy.contains("Cansancio").children().children().last('p').should('contain', '3');

    cy.get("#Nausea").siblings('[role="slider"]').type('{rightarrow}'.repeat(10));
    cy.contains("Nausea").children().children().last('p').should('contain', '10');

    cy.get("#Depresion").siblings('[role="slider"]').type('{rightarrow}'.repeat(8));
    cy.contains("Depresion").children().children().last('p').should('contain', '8');

    cy.get("#Ansiedad").siblings('[role="slider"]').type('{rightarrow}'.repeat(1));
    cy.contains("Ansiedad").children().children().last('p').should('contain', '1');

    cy.get("#Somnolencia").siblings('[role="slider"]').type('{rightarrow}'.repeat(5));
    cy.contains("Somnolencia").children().children().last('p').should('contain', '5');

    cy.get("#Apetito").siblings('[role="slider"]').type('{rightarrow}'.repeat(6));
    cy.contains("Apetito").children().children().last('p').should('contain', '6');

    cy.get("#Bienestar\\/Malestar").siblings('[role="slider"]').type('{rightarrow}'.repeat(4));
    cy.contains("Bienestar/Malestar").children().children().last('p').should('contain', '4');

    cy.get("#Falta\\ de\\ aire").siblings('[role="slider"]').type('{rightarrow}'.repeat(7));
    cy.contains("Falta de aire").children().children().last('p').should('contain', '7');

    cy.get("#Dificultad\\ para\\ dormir").siblings('[role="slider"]');
    cy.contains("Dificultad para dormir").children().children().last('p').should('contain', '0');
  });
});