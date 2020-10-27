import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import userEvent from '@testing-library/user-event'

import { FaceScaleScreen } from 'src/steps/FaceScaleScreen'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('<FaceScaleScreen />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider>
        <FaceScaleScreen />
      </ThemeProvider>
    )
    jest.clearAllMocks()
  })
  afterEach(cleanup)
  test('should show all instructions to choose a face of face scale screen', () => {
    const sayuTitle = screen.getByText(/Cuéntale a sayu cómo te sientes hoy/i)
    const sayuSubtitle = screen.getByText(/Registro de dolor/i)
    const sayuInstructions = screen.getByText(
      /Muéstrale a tu hijo\/hija este dibujo y explícale lo siguiente: "Elige la cara que mejor describa cuánto te duele ahora"/i
    )
    expect(sayuTitle).toBeInTheDocument()
    expect(sayuSubtitle).toBeInTheDocument()
    expect(sayuInstructions).toBeInTheDocument()
  })

  test('should render face info of face scale screen ', () => {
    const faceNumberZeroButton = screen.getByAltText(/^no duele$/i)
    userEvent.click(faceNumberZeroButton)
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/symptoms-registry',
      query: { 'pain-level': 'zero' },
    })
  })
})
