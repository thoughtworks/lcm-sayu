import { NextApiRequest, NextApiResponse } from 'next'
import nextauthclient, { Session } from 'next-auth/client'
import handler from 'pages/api/remove-registries'
import { User } from 'src/model/User'
import { Role } from 'src/model/Role'
import { Status } from 'src/model/Status'
import { clearMocks } from 'test/testUtils'

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

jest.mock('next-auth/client')
const mockNextAuthClient = nextauthclient as jest.Mocked<typeof nextauthclient>

global.console.error = jest.fn()

describe('remove registries', () => {
  let mockRequest: NextApiRequest
  const mockResponse = ({
    send: (jest.fn() as unknown) as NextApiResponse,
    status: (jest.fn() as unknown) as NextApiResponse,
  } as unknown) as NextApiResponse

  beforeEach(() => {
    clearMocks()
    mockNextAuthClient.getSession.mockResolvedValue(({
      role: 'cuidador',
      user: { email: 'test@test.cl' },
    } as unknown) as Session)
    mockRequest = ({
      query: { 'registry-timestamp': '1605712180000' },
    } as unknown) as NextApiRequest
  })

  test('should remove registries', async () => {
    await handler(mockRequest, mockResponse)
    expect(mockResponse.send).toHaveBeenCalledWith(null)
    expect(mockDelete).toHaveBeenCalledWith({
      creationDate: new Date(1605712180000),
      user: mockUser,
    })
  })

  test('should return 401 when user is not a cuidador', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(({
      role: 'tratante',
      user: { email: 'test@test.cl' },
    } as unknown) as Session)

    await handler(mockRequest, mockResponse)
    expect(mockResponse.status).toHaveBeenCalledWith(401)
  })

  test('should return 500 when there is an error', async () => {
    mockFindOne.mockRejectedValueOnce(new Error('User not found test@test.com'))

    await handler(mockRequest, mockResponse)

    expect(global.console.error).toHaveBeenCalledWith(
      new Error('User not found test@test.com')
    )
    expect(mockResponse.status).toHaveBeenCalledWith(500)
  })

  test('should return 500 when registry-timestamp is invalid', async () => {
    mockRequest.query = { 'registry-timestamp': 'invalid' }
    await handler(mockRequest, mockResponse)

    expect(global.console.error).toHaveBeenCalledWith(
      new Error('Invalid registry timestamp')
    )
    expect(mockResponse.status).toHaveBeenCalledWith(500)
  })
})
