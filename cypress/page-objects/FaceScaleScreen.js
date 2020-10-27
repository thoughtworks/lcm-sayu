class FaceScaleScreen {
  clickPainLevel(level) {
    cy.get(`img[alt="${level}"]`).click()
  }
}

export default FaceScaleScreen
