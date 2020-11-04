class SymptomRegistry {
  slideSymptom(symptom, level) {
    if (level != 0)
      cy.get(`#${symptom}`)
        .siblings('[role="slider"]')
        .type('{rightarrow}'.repeat(level))
  }
  radioButtonSymptom(symptom, value) {
    cy.get(`#${symptom}-${value}`).click({ force: true })
  }
  getLevelNumber(symptom) {
    return cy.contains(`${symptom}`).children().children().last('p')
  }

  clickSuccessfulSymptomsRegistryButton() {
    cy.contains('Registrar').click()
  }
}

export default SymptomRegistry
