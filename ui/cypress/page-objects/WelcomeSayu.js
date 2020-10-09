class WelcomeSayu {
  visit() {
    cy.visit('/');
  }
  
  clickRegisterSymptomsButton() {
    cy.contains("Registra síntomas aquí").click();
  }
}

export default WelcomeSayu;