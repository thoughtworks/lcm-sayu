import React from 'react'
import { screen, cleanup, render } from 'test/testUtils'
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
    beforeEach(() => {
      jest.clearAllMocks()
    })

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
      mockQuery.error = 'FailedSymptomsRegistry'
      render(<ErrorPage statusCode={0} />)
      jest.clearAllMocks()
    })

    afterEach(cleanup)

    test('should show failure message', () => {
      const failureMessage = screen.getByText(
        /Ha ocurrido un error, espera unos minutos e inténtalo nuevamente/i
      )
      expect(failureMessage).toBeInTheDocument()
    })

    test('should show face scale screen when button is clicked', () => {
      const retryButton = screen.getByText(/volver a intentarlo/i)
      expect(retryButton).toHaveAttribute('href', '/seleccion-nivel-dolor')
    })

    test('should show welcome screen when button is clicked', () => {
      const cancelButton = screen.getByText(/salir/i)
      expect(cancelButton).toHaveAttribute('href', '/')
    })
  })

  describe('<AuthenticationDeniedError />', () => {
    beforeEach(() => {
      mockQuery.error = 'AccessDenied'
      render(<ErrorPage statusCode={0} />)
      jest.clearAllMocks()
    })

    afterEach(cleanup)

    test('should show access denied message', () => {
      const failureMessage = screen.getByText(
        /ha ocurrido un error durante la autenticación/i
      )
      expect(failureMessage).toBeInTheDocument()
    })

    test('should have a rety button', () => {
      const retryButton = screen.getByText(/volver a intentarlo/i)
      expect(retryButton).toHaveAttribute('href', '/')
    })
  })

  describe('<Unauthorized />', () => {
    beforeEach(() => {
      mockQuery.error = 'Unauthorized'
      render(<ErrorPage statusCode={0} />)
      jest.clearAllMocks()
    })

    afterEach(cleanup)

    test('should show unauthorized message', () => {
      const failureMessage = screen.getByText(
        /no tiene permisos para ver pagina/i
      )
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<GenericError />', () => {
    beforeEach(() => {
      mockQuery.error = ''
      render(<ErrorPage statusCode={0} />)
      jest.clearAllMocks()
    })

    afterEach(cleanup)

    test('should show unauthorized message', () => {
      const failureMessage = screen.getByText(/ha ocurrido un error/i)
      expect(failureMessage).toBeInTheDocument()
    })
  })

  describe('<FailedSymptomRetrieval />', () => {
    beforeEach(() => {
      mockQuery.error = 'FailedSymptomsRetrieval'
      render(<ErrorPage statusCode={0} />)
      jest.clearAllMocks()
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
  })
})
