import { NextApiRequest, NextApiResponse } from 'next'

import { User } from 'src/model/User'

import handler from 'pages/api/validate-email'
import { Role } from 'src/model/Role'
import { clearMocks } from 'test/testUtils'
import { Status } from 'src/model/Status'

const user = new User('test@test.com', Role.CUIDADOR, Status.ACTIVO)
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
  beforeEach(clearMocks)

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
    global.console.error = jest.fn()

    await handler(
      { body: { email: 'test@testcom' } } as NextApiRequest,
      ({
        json: jest.fn(),
      } as unknown) as NextApiResponse
    )

    expect(global.console.error).toHaveBeenCalledWith(
      new Error('Email is invalid')
    )
  })
})
