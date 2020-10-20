class SuccessfulSymptomsRegistry {
    visit() {
      cy.visit('/successful-symptoms-registry');
    }
  
    clickGoBackHome() {
      cy.contains("Ok, volver al inicio").click();
    }
  }
  
  export default SuccessfulSymptomsRegistry;