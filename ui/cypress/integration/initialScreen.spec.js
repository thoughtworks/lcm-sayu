describe("Initial Screen", function () {
  it("Visits SAYU", () => {
    cy.visit("/");
    cy.contains("Registra síntomas aquí");
  });
});
