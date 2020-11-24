import { NextApiRequest, NextApiResponse } from 'next'
import { Registry } from 'src/model/Registry'
import handler from 'pages/api/registry-read'
import { cleanup } from '../../testUtils'
import typeorm from 'typeorm'

beforeEach(() => {
  jest.clearAllMocks()
})

afterEach(cleanup)

const date = new Date('Fri Nov 20 2020 22:18:33')
const secondDate = new Date('Sat Nov 21 2020 22:18:33')
const secondHourDate = new Date('Fri Nov 20 2020 23:18:33')
const twoDaySymptoms: Registry[] = [
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
  {
    id: 49,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: secondDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: secondDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: secondDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
]
const oneDaySymptoms: Registry[] = [
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
  {
    id: 49,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: secondHourDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: secondHourDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: secondHourDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: secondHourDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: secondHourDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
]

const onlyOneHourSymptoms: Registry[] = [
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

let mockFind = jest.fn().mockResolvedValue(twoDaySymptoms)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind }),
    close: jest.fn(),
  }),
}))

describe('Symptom api', () => {
  test('should return symptoms from different dates', async () => {
    const symptomRegistries = [
      {
        id: 9,
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
      {
        id: 16,
        symptomDate: secondDate,
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
  test('should return symptoms from same date', async () => {
    mockFind = jest.fn().mockResolvedValue(oneDaySymptoms)

    const symptomRegistries = [
      {
        id: 9,
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
      {
        id: 16,
        symptomDate: secondHourDate,
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
  test('should return symptoms for only one day and hour', async () => {
    mockFind = jest.fn().mockResolvedValue(onlyOneHourSymptoms)

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
  test('should log error and return 500 HTTP code when there is an error', async () => {
    jest
      .spyOn(typeorm, 'createConnection')
      .mockRejectedValue('Connection error')
    global.console.error = jest.fn()
    const mockStatus = (jest.fn() as unknown) as NextApiResponse
    await handler(
      {} as NextApiRequest,
      ({
        send: (jest.fn() as unknown) as NextApiResponse,
        status: mockStatus,
      } as unknown) as NextApiResponse
    )

    expect(global.console.error).toHaveBeenCalledWith('Connection error')
    expect(mockStatus).toHaveBeenCalledWith(500)
  })
  test('should return nothing when no symptoms are registered', async () => {
    console.log('Estoy en la prueba')
    mockFind = jest.fn().mockResolvedValue([])
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

    expect(mockJson).toHaveBeenCalledWith([])
    expect(mockStatus).toHaveBeenCalledWith(200)
  })
})
