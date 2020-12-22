import React from 'react'
import { cleanup, clearMocks, render, screen } from 'test/testUtils'
import userEvent from '@testing-library/user-event'

import PainLevelSelection from 'src/steps/PainLevelSelection'

const mockPush = jest.fn().mockResolvedValue(null)
const mockBack = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
}))

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tutor' }, false]),
}))

describe('<PainLevelSelection />', () => {
  beforeEach(() => {
    clearMocks()
    render(<PainLevelSelection />)
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
    const faceNumberZeroButton = screen.getByAltText(/^no duele$/i).closest('a')
    expect(faceNumberZeroButton).toHaveAttribute(
      'href',
      '/registro-sintomas?nivel-dolor=0'
    )
  })

  test('should go back when pressing back arrow', () => {
    const goBackButton = screen.getByAltText(/ir atrás/i)
    userEvent.click(goBackButton)
    expect(mockBack).toHaveBeenCalled()
  })

  test('should go to home page when close button is clicked', () => {
    const closeButton = screen.getByAltText(/volver al home/i).closest('a')
    expect(closeButton).toHaveAttribute('href', '/')
  })
})
