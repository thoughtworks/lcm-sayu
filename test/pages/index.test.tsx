import { render, screen, userEvent, cleanup } from 'test/testUtils'
import NextAuth, { Session } from 'next-auth/client'

import WelcomeSayu from 'pages/index'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next-auth/client')

describe('Home page', () => {
  const mockSession: Session = {
    user: {
      email: 'test@test.com',
      name: 'test',
      image: 'http://test.com/test.png',
    },
    expires: '',
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('when click on the button should redirect to index', () => {
    jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])

    render(<WelcomeSayu />)

    const button = screen.getByText(/registrar síntomas/i)
    expect(button).toHaveAttribute('href', '/face-scale-screen')
  })

  test('when click on logout button should call signout', () => {
    jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])
    const mockSignOut = jest.spyOn(NextAuth, 'signout')
    render(<WelcomeSayu />)

    const signoutButton = screen.getByText(/^salir$/i)
    userEvent.click(signoutButton)

    expect(mockSignOut).toHaveBeenCalled()
  })
})
