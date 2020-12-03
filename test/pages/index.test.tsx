import { render, screen, userEvent, cleanup, clearMocks } from 'test/testUtils'
import NextAuth, { Session } from 'next-auth/client'

import WelcomeSayu from 'pages/index'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next-auth/client')

describe('Home page', () => {
  describe('Cuidador Role', () => {
    const mockSession: Session = {
      user: {
        email: 'test@test.com',
        name: 'test',
        image: 'http://test.com/test.png',
      },
      expires: '',
      role: 'cuidador',
    }
    beforeEach(clearMocks)

    afterEach(cleanup)

    test('when click on the button should redirect to index', () => {
      jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])

      render(<WelcomeSayu />)

      const button = screen.getByText(/registrar síntomas/i)
      expect(button).toHaveAttribute('href', '/seleccion-nivel-dolor')
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

  describe('Tratante Role', () => {
    const mockSession: Session = {
      user: {
        email: 'test@test.com',
        name: 'test',
        image: 'http://test.com/test.png',
      },
      expires: '',
      role: 'tratante',
    }
    beforeEach(clearMocks)

    afterEach(cleanup)
    test('when tratante role login should show Gestionar Usuarios button', () => {
      jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])
      render(<WelcomeSayu />)

      const userManagementButton = screen.getByText(/^Gestionar usuarios$/)
      expect(userManagementButton).toHaveAttribute(
        'href',
        '/tratante/gestion-usuario'
      )
    })

    test('when tratante role login should show  Ver Cuidadores button', () => {
      jest.spyOn(NextAuth, 'useSession').mockReturnValue([mockSession, false])
      render(<WelcomeSayu />)

      const carerViewButton = screen.getByText(/^Ver cuidadores$/)
      expect(carerViewButton).toHaveAttribute(
        'href',
        '/tratante/ver-cuidadores'
      )
    })
  })
})
