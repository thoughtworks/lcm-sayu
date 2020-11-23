import { NextApiRequest, NextApiResponse } from 'next'
import { Registry } from 'src/model/Registry'
import handler from 'pages/api/registry-read'
import { cleanup } from '../../testUtils'

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(cleanup)

const date = new Date('Fri Nov 20 2020 22:18:33')
const symptoms: Registry[] = [
  {
    id: 41,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
]

const mockFind = jest.fn().mockResolvedValue(symptoms)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind }),
    close: jest.fn(),
  }),
}))
const dateNow = 1604083287383
global.Date.now = jest.fn().mockReturnValue(dateNow)

describe('Symptom api', () => {
  test('should return symptoms', async () => {
    const symptomRegistries = [
      {
        id: 8,
        symptomDate: date,
        painLevel: 4,
        tireLevel: 1,
        appetiteLevel: 4,
        nauseaLevel: 3,
        swallowLevel: 6,
        airLevel: 5,
        depositionLevel: true,
        feverLevel: true,
      },
    ]
    const mockStatus = (jest.fn() as unknown) as NextApiResponse
    const mockJson = (jest.fn() as unknown) as NextApiResponse
    await handler(
      {} as NextApiRequest,
      ({
        send: (jest.fn() as unknown) as NextApiResponse,
        status: mockStatus,
        json: mockJson,
      } as unknown) as NextApiResponse
    )

    expect(mockJson).toHaveBeenCalledWith(symptomRegistries)
    expect(mockStatus).toHaveBeenCalledWith(200)
  })
})
