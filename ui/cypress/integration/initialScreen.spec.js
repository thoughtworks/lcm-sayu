import WelcomeSayu from '../page-objects/WelcomeSayu'
import FaceScaleScreen from '../page-objects/FaceScaleScreen'
import SymptomsRegistry from '../page-objects/SymptomsRegistry'
import SuccessfulSymptomsRegistry from '../page-objects/SuccessfulSymptomsRegistry'

describe("Enter and record pain and symptoms", function () {
  it("Enter and record pain and symptoms", () => {
    const welcomeSayu = new WelcomeSayu();
    const faceScaleScreen = new FaceScaleScreen();
    const symptomsRegistry = new SymptomsRegistry();
    const successfulSymptomsRegistry = new SuccessfulSymptomsRegistry();

    welcomeSayu.visit();
    welcomeSayu.clickRegisterSymptomsButton();

    faceScaleScreen.clickPainLevel("Duele un poco más");

    cy.contains("Duele un poco más");
    cy.contains("¿Tienes otros síntomas?");
    cy.contains(" Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este.");

    symptomsRegistry.slideSymptom("Cansancio", 3);
    symptomsRegistry.getLevelNumber("Cansancio").should('contain', 3);

    symptomsRegistry.slideSymptom("Náusea", 10);
    symptomsRegistry.getLevelNumber("Náusea").should('contain', 10);

    symptomsRegistry.slideSymptom("Depresión", 8);
    symptomsRegistry.getLevelNumber("Depresión").should('contain', 8);

    symptomsRegistry.slideSymptom("Ansiedad", 1);
    symptomsRegistry.getLevelNumber("Ansiedad").should('contain', 1);

    symptomsRegistry.slideSymptom("Somnolencia", 5);
    symptomsRegistry.getLevelNumber("Somnolencia").should('contain', 5);

    symptomsRegistry.slideSymptom("Apetito", 6);
    symptomsRegistry.getLevelNumber("Apetito").should('contain', 6);

    symptomsRegistry.slideSymptom("Bienestar\\/Malestar", 4);
    symptomsRegistry.getLevelNumber("Bienestar/Malestar").should('contain', 4);

    symptomsRegistry.slideSymptom("Falta\\ de\\ aire", 7);
    symptomsRegistry.getLevelNumber("Falta de aire").should('contain', 7);

    symptomsRegistry.slideSymptom("Dificultad\\ para\\ dormir", 3);
    symptomsRegistry.getLevelNumber("Dificultad para dormir").should('contain', 3);

    symptomsRegistry.clickSuccessfulSymptomsRegistryButton();
    cy.contains("Tu registro");
  });

});