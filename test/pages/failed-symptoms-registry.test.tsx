import React from 'react'
import userEvent from '@testing-library/user-event'
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
    userEvent.click(retryButton)
    expect(mockPush).toHaveBeenCalledWith('/face-scale-screen')
  })

  test('should show welcome screen when button is clicked', () => {
    const cancelButton = screen.getByText(/salir/i)
    userEvent.click(cancelButton)
    expect(mockPush).toHaveBeenCalledWith('/')
  })
})
