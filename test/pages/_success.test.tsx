import React from 'react'
import { screen, cleanup, render } from 'test/testUtils'
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
      render(<SuccessPage />)
      jest.clearAllMocks()
    })

    afterEach(cleanup)

    test('should show failure message', () => {
      const successMessage = screen.getByText(/^¡Todo ha salido bien! ✅$/)
      expect(successMessage).toBeInTheDocument()
    })

    test('should show face scale screen when button is clicked', () => {
      const returnButton = screen.getByText(/^Volver al inicio$/)
      expect(returnButton).toHaveAttribute('href', '/')
    })
  })

  describe('<SuccessfulSymptomRegistry />', () => {
    beforeEach(() => {
      mockQuery.key = SuccessCodes.SUCCESSFUL_SYMPTOM_REGISTRY
      render(<SuccessPage />)
      jest.clearAllMocks()
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
      mockQuery.key = SuccessCodes.SUCCESSFUL_USER_REGISTRY
      render(<SuccessPage />)
      jest.clearAllMocks()
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
