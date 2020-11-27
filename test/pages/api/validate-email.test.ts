import { NextApiRequest, NextApiResponse } from 'next'

import { User } from 'src/model/User'

import handler from 'pages/api/validate-email'
import { Role } from 'src/model/Role'

const user = new User('test@test.com', Role.CUIDADOR)
const mockFind = jest.fn().mockResolvedValue(user)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ findOne: mockFind }),
    close: jest.fn(),
  }),
}))

jest.mock('next-auth/client', () => ({
  getSession: jest.fn().mockReturnValue({ role: 'tratante' }),
}))
describe('Validate email api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return true if email already exists', async () => {
    const mockJson = jest.fn()
    const email = { email: 'test@test.com' }
    await handler(
      { body: email } as NextApiRequest,
      ({
        json: mockJson,
      } as unknown) as NextApiResponse
    )
    expect(mockJson).toHaveBeenCalledWith({ emailAlreadyExist: true })
  })

  test('should return false if email does not exist', async () => {
    const mockJson = jest.fn()
    mockFind.mockResolvedValue(null)
    const email = { email: 'test@test.com' }
    await handler(
      { body: email } as NextApiRequest,
      ({
        json: mockJson,
      } as unknown) as NextApiResponse
    )
    expect(mockJson).toHaveBeenCalledWith({ emailAlreadyExist: false })
  })

  test('should log error  when there is  an error', async () => {
    const errorTest = new Error('Connection refused')
    global.console.error = jest.fn()
    mockFind.mockRejectedValue(errorTest)
    await handler(
      { body: { email: 'test@testcom' } } as NextApiRequest,
      ({
        json: jest.fn(),
      } as unknown) as NextApiResponse
    )

    expect(global.console.error).toHaveBeenCalledWith(errorTest)
  })
})
