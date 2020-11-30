import { NextApiRequest, NextApiResponse } from 'next'
import typeorm from 'typeorm'

import handler from 'pages/api/user-save'
import { Role } from 'src/model/Role'
import { clearMocks } from 'test/testUtils'

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
  beforeEach(clearMocks)

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

  test('should create user with role tratante', async () => {
    const user = {
      userEmail: 'test@test.com',
      role: Role.TRATANTE,
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
      role: Role.TRATANTE,
      createdAt: new Date(dateNow),
    })
  })

  test('should return error message when email format is not valid', async () => {
    global.console.error = jest.fn()
    const mockStatus = jest.fn()
    const user = {
      userEmail: 'wrong_email',
      role: Role.CUIDADOR,
    }

    const request: NextApiRequest = ({
      body: user,
    } as unknown) as NextApiRequest
    const response: NextApiResponse = ({
      send: jest.fn(),
      status: mockStatus,
    } as unknown) as NextApiResponse

    await handler(request, response)

    expect(global.console.error).toHaveBeenCalledWith('Email is invalid', {
      role: 'cuidador',
      userEmail: 'wrong_email',
    })
    expect(mockStatus).toHaveBeenCalledWith(500)
  })

  test('should return error message when email is empty', async () => {
    global.console.error = jest.fn()
    const mockStatus = jest.fn()
    const user = {
      userEmail: '',
      role: Role.CUIDADOR,
    }

    const request: NextApiRequest = ({
      body: user,
    } as unknown) as NextApiRequest
    const response: NextApiResponse = ({
      send: jest.fn(),
      status: mockStatus,
    } as unknown) as NextApiResponse

    await handler(request, response)

    expect(global.console.error).toHaveBeenCalledWith('Email is empty', {
      role: 'cuidador',
      userEmail: '',
    })
    expect(mockStatus).toHaveBeenCalledWith(500)
  })

  test('should return error message when role is invalid', async () => {
    global.console.error = jest.fn()
    const mockStatus = jest.fn()
    const user = {
      userEmail: 'test@test.com',
      role: 'invalid',
    }

    const request: NextApiRequest = ({
      body: user,
    } as unknown) as NextApiRequest
    const response: NextApiResponse = ({
      send: jest.fn(),
      status: mockStatus,
    } as unknown) as NextApiResponse

    await handler(request, response)

    expect(global.console.error).toHaveBeenCalledWith('Role is invalid', {
      role: 'invalid',
      userEmail: 'test@test.com',
    })
    expect(mockStatus).toHaveBeenCalledWith(500)
  })

  test('should log error when is not a Error object', async () => {
    global.console.error = jest.fn()
    const mockStatus = jest.fn()
    jest.spyOn(typeorm, 'createConnection').mockRejectedValue('custom error')

    const user = {
      userEmail: 'test@test.com',
      role: Role.CUIDADOR,
    }

    const request: NextApiRequest = ({
      body: user,
    } as unknown) as NextApiRequest
    const response: NextApiResponse = ({
      send: jest.fn(),
      status: mockStatus,
    } as unknown) as NextApiResponse

    await handler(request, response)

    expect(global.console.error).toHaveBeenCalledWith('custom error', {
      role: 'cuidador',
      userEmail: 'test@test.com',
    })
    expect(mockStatus).toHaveBeenCalledWith(500)
  })

  test('should save email in lower case without dots', async () => {
    const user = {
      userEmail: 'test.TEST.teSt@test.com',
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
      email: 'testtesttest@test.com',
      role: 'cuidador',
      createdAt: new Date(dateNow),
    })
  })
})