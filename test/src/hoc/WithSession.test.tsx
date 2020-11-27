import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { render, cleanup } from 'test/testUtils'
import NextAuth, { Session } from 'next-auth/client'

import { withSessionServer } from 'src/hoc/WithSession'
import WelcomeSayu from 'pages/index'
import { Role } from 'src/model/Role'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next-auth/client')

describe('WithSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('when there is no session should redirect to login', () => {
    jest.spyOn(NextAuth, 'useSession').mockReturnValue([null, false])
    render(<WelcomeSayu />)
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  test('when there is no session on the server side should return 401 error', async () => {
    global.console.error = jest.fn()
    jest.spyOn(NextAuth, 'getSession').mockResolvedValue(({
      role: 'foo',
    } as unknown) as Session)
    const handler = jest.fn() as NextApiHandler
    const response = await withSessionServer(handler, [Role.CUIDADOR])
    const mockRequest = ({} as unknown) as NextApiRequest
    const mockResponse = ({
      send: jest.fn(),
      status: jest.fn(),
    } as unknown) as NextApiResponse

    await response(mockRequest, mockResponse)

    expect(mockResponse.send).toHaveBeenCalledWith(null)
    expect(mockResponse.status).toHaveBeenCalledWith(401)
    expect(global.console.error).toHaveBeenCalledWith(
      'Access denied for user',
      { role: 'foo' }
    )
  })
})
