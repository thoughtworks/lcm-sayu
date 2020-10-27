import { render, screen, fireEvent, cleanup } from 'test/testUtils'

import SymptomsRegistry from 'pages/symptoms-registry'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      'pain-level': 'zero',
    },
  }),
}))

describe('Home page', () => {
  beforeEach(() => {
    render(<SymptomsRegistry />)
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('Should render pain box info', () => {
    const painBoxDescription = screen.getByText(/sin dolor/i)
    expect(painBoxDescription).toBeInTheDocument()
  })

  test('should show title message', () => {
    const introMessage = screen.getByText(
      /Cuéntale a sayu cómo te sientes hoy/i
    )
    expect(introMessage).toBeInTheDocument()
  })

  test('should show symptoms message', () => {
    const moreSymptomsMessage = screen.getByText(/¿Tienes otros síntomas?/i)
    expect(moreSymptomsMessage).toBeInTheDocument()
    const registerSymptomsMessage = screen.getByText(
      /Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este./i
    )
    expect(registerSymptomsMessage).toBeInTheDocument()
  })

  test('should show Cansancio symptom', () => {
    const cansancioText = screen.getByText(/^Cansancio$/i)
    expect(cansancioText).toBeInTheDocument()
    const minCansancioText = screen.getByText(/Sin cansancio/i)
    expect(minCansancioText).toBeInTheDocument()
    const maxCansancioText = screen.getByText(/Máximo Cansancio/i)
    expect(maxCansancioText).toBeInTheDocument()
  })

  test('Should change symptom level value when it moves to right side', async () => {
    const [sliderButton] = screen.getAllByRole('slider')
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    expect(await screen.findByText('3')).toBeVisible()
  })

  test('Should show the right symptom text', async () => {
    const nauseaText = screen.getByText(/^Náusea$/i)
    expect(nauseaText).toBeInTheDocument()
    const minNauseaText = screen.getByText(/Sin náusea/i)
    expect(minNauseaText).toBeInTheDocument()
    const maxNauseaText = screen.getByText(/Máxima náusea/i)
    expect(maxNauseaText).toBeInTheDocument()
  })
})
