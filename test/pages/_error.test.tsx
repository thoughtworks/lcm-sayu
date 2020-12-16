import React from 'react'
import { screen, cleanup, render, clearMocks } from 'test/testUtils'
import ErrorPage, { getServerSideProps } from 'pages/_error'

const mockPush = jest.fn().mockResolvedValue(null)
const mockQuery = {
  error: '',
}
jest.mock('next/router', () => ({
  useRouter: () => ({ query: mockQuery, push: mockPush }),
}))

describe('_error', () => {
  describe('getServerSideProps', () => {
    beforeEach(clearMocks)

    test('should return response status code', () => {
      const expectedStatusCode = 400
      expect(
        getServerSideProps({ res: { statusCode: expectedStatusCode } })
      ).toEqual({
        props: { statusCode: expectedStatusCode },
      })
    })

    test('should return error status code', () => {
      const expectedStatusCode = 400

      expect(
        getServerSideProps({ err: { statusCode: expectedStatusCode } })
      ).toEqual({
        props: { statusCode: expectedStatusCode },
      })
    })

    test('should return default status code', () => {
      const defaultStatusCode = 404
      expect(getServerSideProps({})).toEqual({
        props: { statusCode: defaultStatusCode },
      })
    })
  })

  describe('<FailedSymptomRegistry />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'FailedSymptomsRegistry'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show failure message', () => {
      const failureMessage = screen.getByText(
        /^Ha ocurrido un error, espera unos minutos e inténtalo nuevamente.$/
      )
      expect(failureMessage).toBeInTheDocument()
    })

    test('should show face scale screen when button is clicked', () => {
      const retryButton = screen.getByText(/^Volver a intentarlo$/)
      expect(retryButton).toHaveAttribute('href', '/seleccion-nivel-dolor')
    })

    test('should show welcome screen when button is clicked', () => {
      const cancelButton = screen.getByText(/^Salir$/)
      expect(cancelButton).toHaveAttribute('href', '/')
    })
  })

  describe('<AuthenticationDeniedError />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'AccessDenied'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show access denied message', () => {
      const failureMessage = screen.getByText(
        /^Ha ocurrido un error durante la autenticación$/
      )
      expect(failureMessage).toBeInTheDocument()
    })

    test('should have a retry button', () => {
      const retryButton = screen.getByText(/^Salir$/)
      expect(retryButton).toHaveAttribute('href', '/')
    })
  })

  describe('<Unauthorized />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'Unauthorized'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show unauthorized message', () => {
      const failureMessage = screen.getByText(
        /^No tiene permisos para ver pagina$/
      )
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<GenericError />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = ''
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show unauthorized message', () => {
      const failureMessage = screen.getByText(/^Ha ocurrido un error ❌.$/)
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<FailedSymptomsRetrieval />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'FailedSymptomsRetrieval'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show failure message', () => {
      const failureMessage = screen.getByText(
        /Ha ocurrido un error, espera unos minutos e inténtalo nuevamente/i
      )
      expect(failureMessage).toBeInTheDocument()
    })

    test('should show welcome screen when button is clicked', () => {
      const cancelButton = screen.getByText(/salir/i)
      expect(cancelButton).toHaveAttribute('href', '/')
    })

    test('should redirect to symptoms retrieval page when retry button is clicked', () => {
      const retryButton = screen.getByText(/volver a intentarlo/i)
      expect(retryButton).toHaveAttribute('href', '/ver-registros-sintomas')
    })
  })

  describe('<UserRegistryError />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'UserRegistryError'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show user registry error message', () => {
      const failureMessage = screen.getByText(
        /^Ha ocurrido un error al intentar guardar el usuario.$/
      )
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<UserManagementError />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'UserListError'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show user registry error message', () => {
      const failureMessage = screen.getByText(
        /^Ha ocurrido un error al intentar mostrar los usuarios.$/
      )
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<InactiveUser />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'InactiveUser'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show user registry error message', () => {
      const failureMessage = screen.getByText(/^Usuario inactivo$/)
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<UserEditError />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.error = 'UserEditError'
      render(<ErrorPage statusCode={0} />)
    })

    afterEach(cleanup)

    test('should show user registry error message', () => {
      const failureMessage = screen.getByText(
        /^Ha ocurrido un error al intentar editar el usuario$/
      )
      expect(failureMessage).toBeInTheDocument()
    })
  })
})
