import { render, screen, userEvent } from 'test/testUtils'

import WelcomeSayu from 'pages/index'
import NextAuth, { Session } from 'next-auth/client'
const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const mockSession: Session = {
  user: {
    email: 'test@test.com',
    name: 'test',
    image: 'http://test.com/test.png',
  },
  expires: '',
}
jest.mock('next-auth/client')
jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])

describe('Home page', () => {
  test('when click on the button should redirect to index', () => {
    render(<WelcomeSayu />)
    const button = screen.getByText(/registrar síntomas/i)
    userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/face-scale-screen')
  })
})
