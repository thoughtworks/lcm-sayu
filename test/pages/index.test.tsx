import { render, screen, userEvent } from 'test/testUtils'

import WelcomeSayu from 'pages/index'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('Home page', () => {
  test('when click on the button should redirect to index', () => {
    render(<WelcomeSayu />)
    const button = screen.getByText(/registrar síntomas/i)
    userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/face-scale-screen')
  })
})
