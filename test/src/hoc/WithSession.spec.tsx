import { render } from 'test/testUtils'
import NextAuth from 'next-auth/client'

import WelcomeSayu from 'pages/index'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next-auth/client')

describe('WithSession', () => {
  test('when there is no session should redirect to login', () => {
    jest.spyOn(NextAuth, 'useSession').mockReturnValue([null, false])
    render(<WelcomeSayu />)
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
