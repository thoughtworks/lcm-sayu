import React from 'react'
import { screen, cleanup, render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import { FailedSymptomsRegistry } from 'src/steps/FailedSymptomsRegistry'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('<FailedSymptomRegistry />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <FailedSymptomsRegistry />
      </ThemeProvider>
    )
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
    expect(retryButton).toHaveAttribute('href', '/face-scale-screen')
  })

  test('should show welcome screen when button is clicked', () => {
    const cancelButton = screen.getByText(/salir/i)
    expect(cancelButton).toHaveAttribute('href', '/')
  })
})
