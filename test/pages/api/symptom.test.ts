describe('Symptom api', () => {
  test('should save the symptoms', () => {
    const symptom = {
      Cansancio: 0,
      Náusea: 0,
      Apetito: 0,
      'Falta de aire': 0,
      'Dificultad para tragar:': 0,
      Constipación: '0',
      Fiebre: '0',
      Dolor: 0,
    }
    saveSymptom(symptom)
  })
})
