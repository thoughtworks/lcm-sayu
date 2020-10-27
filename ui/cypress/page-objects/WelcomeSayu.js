class WelcomeSayu {
  visit() {
    cy.visit('/');
  }

  clickRegisterSymptomsButton() {
    cy.contains("Registrar síntomas").click();
  }
}

export default WelcomeSayu;