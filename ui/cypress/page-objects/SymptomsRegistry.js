class SymptomRegistry {
    slideSymptom(symptom, level) {
        if (level != 0)
            cy.get(`#${symptom}`).siblings('[role="slider"]').type('{rightarrow}'.repeat(level));
    }

    getLevelNumber(symptom) {
        return cy.contains(`${symptom}`).children().children().last('p');
    }

    clickSuccessfulSymptomsRegistryButton() {
        cy.contains("Guardar").click();
      }

  }
  
  export default SymptomRegistry;