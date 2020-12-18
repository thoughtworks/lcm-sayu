import handler from 'pages/api/remove-registries/[...registryDateValues]'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'src/model/User'
import { Role } from 'src/model/Role'
import { Status } from 'src/model/Status'

const mockUser = new User('test@test.com', Role.CUIDADOR, Status.ACTIVO)
const mockDelete = jest.fn().mockResolvedValue(null)
const mockFindOne = jest.fn().mockResolvedValue(mockUser)
const mockConnection = {
  getRepository: () => ({
    delete: mockDelete,
    findOne: mockFindOne,
  }),
  close: jest.fn(),
}
jest.mock('typeorm', () => ({
  createConnection: () => mockConnection,
  getConnection: () => mockConnection,
}))

jest.mock('next-auth/client', () => ({
  getSession: jest
    .fn()
    .mockReturnValue({ role: 'cuidador', user: { email: 'test@test.cl' } }),
}))

describe('remove registries', () => {
  const mockRequest = ({
    query: { registryDateValues: ['2020', '11', '18', '12', '9', '40', '509'] },
  } as unknown) as NextApiRequest
  const mockResponse = ({
    send: (jest.fn() as unknown) as NextApiResponse,
    status: (jest.fn() as unknown) as NextApiResponse,
  } as unknown) as NextApiResponse

  test('should remove registries', async () => {
    await handler(mockRequest, mockResponse)
    expect(mockResponse.send).toHaveBeenCalledWith(null)
    expect(mockDelete).toHaveBeenCalledWith({
      creationDate: new Date(2020, 10, 18, 12, 9, 40, 509),
      user: mockUser,
    })
  })
})
