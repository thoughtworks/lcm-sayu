import { NextApiRequest, NextApiResponse } from 'next'
import { Symptom } from 'src/model/Symptom'
import handler from 'pages/api/registry-save'

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
  test('should save symptoms', async () => {
    const creationDate = new Date(dateNow)
    const symptom = {
      painlevel: 0,
      fiebre: 1,
      constipacion: 0,
      cansancio: 2,
      nausea: 3,
      apetito: 4,
      aire: 0,
      tragar: 1,
    }
    await handler(
      { body: symptom } as NextApiRequest,
      ({
        send: (jest.fn() as unknown) as NextApiResponse,
        status: (jest.fn() as unknown) as NextApiResponse,
      } as unknown) as NextApiResponse
    )

    expect(mockSave).toHaveBeenCalledWith([
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 1, name: 'Cansancio' },
        value: 2,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 2, name: 'Apetito' },
        value: 4,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 3, name: 'Dificultad para tragar' },
        value: 1,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 4, name: 'Fiebre' },
        value: 1,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 5, name: 'Dolor' },
        value: 0,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 6, name: 'Náusea' },
        value: 3,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 7, name: 'Constipación' },
        value: 0,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 8, name: 'Falta de aire' },
        value: 0,
      },
    ])
  })
})
