import React from 'react'
import { screen, cleanup, render, clearMocks } from 'test/testUtils'
import SuccessPage from 'pages/_success'
import { SuccessCodes } from 'src/components/Success'

const mockPush = jest.fn().mockResolvedValue(null)
const mockQuery = {
  key: '',
}
jest.mock('next/router', () => ({
  useRouter: () => ({ query: mockQuery, push: mockPush }),
}))

describe('_success', () => {
  describe('<GenericSuccess />', () => {
    beforeEach(() => {
      clearMocks()
      render(<SuccessPage />)
    })

    afterEach(cleanup)

    test('should show failure message', () => {
      const successMessage = screen.getByText(/^¡Todo ha salido bien! ✅$/)
      expect(successMessage).toBeInTheDocument()
    })

    test('should show return to home page button', () => {
      const returnButton = screen.getByText(/^Volver al inicio$/)
      expect(returnButton).toHaveAttribute('href', '/')
    })

    test("shouldn't show another button but return to home page button", () => {
      const anchorElements = screen.getAllByRole('link')
      expect(anchorElements.length).toBe(1)
    })
  })

  describe('<SuccessfulSymptomRegistry />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.key = SuccessCodes.SUCCESSFUL_SYMPTOM_REGISTRY
      render(<SuccessPage />)
    })

    afterEach(cleanup)

    test('should show access denied message', () => {
      const successMessage = screen.getByText(
        /^¡Se han guardado los síntomas exitosamente!$/
      )
      expect(successMessage).toBeInTheDocument()
    })
  })

  describe('<SuccessfulUserRegistry />', () => {
    beforeEach(() => {
      clearMocks()
      mockQuery.key = SuccessCodes.SUCCESSFUL_USER_REGISTRY
      render(<SuccessPage />)
    })

    afterEach(cleanup)

    test('should show access denied message', () => {
      const successMessage = screen.getByText(
        /^¡Se ha registrado el usuario de manera exitosa!$/
      )
      expect(successMessage).toBeInTheDocument()
    })
  })
})
