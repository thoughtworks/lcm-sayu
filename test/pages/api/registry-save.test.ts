import { NextApiRequest, NextApiResponse } from 'next'
import typeorm from 'typeorm'

import { Symptom } from 'src/model/Symptom'

import handler from 'pages/api/registry-save'

import { clearMocks } from 'test/testUtils'

const symptoms: Symptom[] = [
  { id: 1, name: 'Cansancio' },
  { id: 2, name: 'Apetito' },
  { id: 3, name: 'Dificultad para tragar' },
  { id: 4, name: 'Fiebre' },
  { id: 5, name: 'Dolor' },
  { id: 6, name: 'Náusea' },
  { id: 7, name: 'Deposiciones' },
  { id: 8, name: 'Falta de aire' },
  { id: 9, name: 'Rescate' },
  { id: 10, name: 'Registro en BD no en Sistema' },
]
const mockFind = jest.fn().mockResolvedValue(symptoms)
const mockFindOne = jest.fn().mockResolvedValue(null)
const mockSave = jest.fn().mockResolvedValue(null)
const mockConnection = {
  getRepository: () => ({
    find: mockFind,
    save: mockSave,
    findOne: mockFindOne,
  }),
  close: jest.fn(),
}
jest.mock('typeorm', () => ({
  createConnection: () => mockConnection,
  getConnection: () => mockConnection,
}))

const dateNow = 1604083287383
global.Date.now = jest.fn().mockReturnValue(dateNow)

jest.mock('next-auth/client', () => ({
  getSession: jest
    .fn()
    .mockReturnValue({ role: 'cuidador', user: { email: 'test@test.com' } }),
}))

describe('Symptom api', () => {
  const symptom = {
    painlevel: 0,
    fiebre: 1,
    deposiciones: 0,
    rescate: 0,
    cansancio: 2,
    nausea: 3,
    apetito: 4,
    aire: 0,
    tragar: 1,
  }

  beforeEach(clearMocks)

  test('should save symptoms', async () => {
    const creationDate = new Date(dateNow)
    const user = {
      createdAt: 0,
      id: 1,
      email: 'test@test.com',
      role: 'cuidador',
    }
    mockFindOne.mockResolvedValueOnce(user)

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
        user,
        value: 2,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 2, name: 'Apetito' },
        user,
        value: 4,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 3, name: 'Dificultad para tragar' },
        user,
        value: 1,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 4, name: 'Fiebre' },
        user,
        value: 1,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 5, name: 'Dolor' },
        user,
        value: 0,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 6, name: 'Náusea' },
        user,
        value: 3,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 7, name: 'Deposiciones' },
        user,
        value: 0,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 8, name: 'Falta de aire' },
        user,
        value: 0,
      },
      {
        creationDate: creationDate,
        id: undefined,
        symptom: { id: 9, name: 'Rescate' },
        value: 0,
      },
    ])
  })

  test('should log error and return 500 HTTP code when there is an error', async () => {
    jest
      .spyOn(typeorm, 'createConnection')
      .mockRejectedValue('Connection error')
    global.console.error = jest.fn()
    const mockStatus = (jest.fn() as unknown) as NextApiResponse
    await handler(
      { body: symptom } as NextApiRequest,
      ({
        send: (jest.fn() as unknown) as NextApiResponse,
        status: mockStatus,
      } as unknown) as NextApiResponse
    )

    expect(global.console.error).toHaveBeenCalledWith(
      new Error('User not found test@test.com')
    )
    expect(mockStatus).toHaveBeenCalledWith(500)
  })
})
