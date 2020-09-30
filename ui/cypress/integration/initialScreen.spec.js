describe("Initial Screen", function () {
  it("Visits SAYU System", () => {
    cy.visit("/");
    cy.contains("Registra síntomas aquí");
  });
});
