import { NextApiRequest, NextApiResponse } from 'next'

import handler from 'pages/api/user-save'
import { Role } from 'src/model/Role'

const mockFind = jest.fn().mockResolvedValue(null)
const mockSave = jest.fn().mockResolvedValue(null)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind, save: mockSave }),
    close: jest.fn(),
  }),
}))
const dateNow = 1604083287383
global.Date.now = jest.fn().mockReturnValue(dateNow)

jest.mock('next-auth/client', () => ({
  getSession: jest.fn().mockReturnValue({ role: 'tratante' }),
}))
describe('Symptom api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should save user', async () => {
    const user = {
      userEmail: 'test@test.com',
      role: Role.CUIDADOR,
    }

    const request: NextApiRequest = ({
      body: user,
    } as unknown) as NextApiRequest
    const response: NextApiResponse = ({
      send: jest.fn(),
      status: jest.fn(),
    } as unknown) as NextApiResponse

    await handler(request, response)

    expect(mockSave).toHaveBeenCalledWith({
      email: 'test@test.com',
      role: Role.CUIDADOR,
      createdAt: new Date(dateNow),
    })
  })
})
