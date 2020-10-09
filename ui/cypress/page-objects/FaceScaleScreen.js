class FaceScaleScreen {
    clickPainLevel(level) {
        cy.contains(level).click();
    }
  }
  
  export default FaceScaleScreen;