import handler from 'pages/api/symptom'
import { NextApiRequest, NextApiResponse } from 'next'
import { Symptom } from '../../../src/model/Symptom'

const symptoms: Symptom[] = [
  { id: 1, name: 'Cansancio' },
  { id: 2, name: 'Apetito' },
  { id: 3, name: 'Dificultad para tragar' },
  { id: 4, name: 'Fiebre' },
  { id: 5, name: 'Dolor' },
  { id: 6, name: 'Náusea' },
  { id: 7, name: 'Constipación' },
  { id: 8, name: 'Falta de aire' },
]
const mockFind = jest.fn().mockResolvedValue(symptoms)
const mockSave = jest.fn().mockResolvedValue(null)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind, save: mockSave }),
    close: jest.fn(),
  }),
}))
const dateNow = 1604083287383
global.Date.now = jest.fn().mockReturnValue(dateNow)

describe('Symptom api', () => {
  test('should save the symptoms', async () => {
    const creationDate = new Date(dateNow)
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
    await handler(
      { body: JSON.stringify(symptom) } as NextApiRequest,
      {} as NextApiResponse
    )

    expect(mockSave).toHaveBeenCalledWith([
      {
        creationDate,
        symptom: { id: 4, name: 'Fiebre' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 7, name: 'Constipación' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 1, name: 'Cansancio' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 6, name: 'Náusea' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 2, name: 'Apetito' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 8, name: 'Falta de aire' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 3, name: 'Dificultad para tragar' },
        value: undefined,
      },
      {
        creationDate,
        symptom: { id: 5, name: 'Dolor' },
        value: undefined,
      },
    ])
  })
})
