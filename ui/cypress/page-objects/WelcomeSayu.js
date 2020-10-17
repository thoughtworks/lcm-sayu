class WelcomeSayu {
  visit() {
    cy.visit('/');
  }

  clickRegisterSymptomsButton() {
    cy.contains("Comencemos").click();
  }
}

export default WelcomeSayu;