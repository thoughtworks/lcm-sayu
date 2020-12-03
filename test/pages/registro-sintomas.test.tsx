import {
  render,
  screen,
  fireEvent,
  cleanup,
  userEvent,
  waitFor,
  clearMocks,
} from 'test/testUtils'
import axios from 'axios'
import SymptomsRegistry from 'pages/registro-sintomas'

jest.mock('axios')

const mockPush = jest.fn().mockResolvedValue(null)
const mockQuery: { 'nivel-dolor': string | undefined } = {
  'nivel-dolor': '0',
}
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: mockQuery,
    push: mockPush,
  }),
}))

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tutor' }, false]),
}))

describe('Home page', () => {
  beforeEach(() => {
    clearMocks()
  })

  afterEach(cleanup)

  test('Should render pain box info', () => {
    render(<SymptomsRegistry />)

    const painBoxDescription = screen.getByText(/^No duele$/)

    expect(painBoxDescription).toBeInTheDocument()
  })

  test('should show title message', () => {
    render(<SymptomsRegistry />)

    const introMessage = screen.getByText(
      /Cuéntale a sayu cómo te sientes hoy/i
    )

    expect(introMessage).toBeInTheDocument()
  })

  test('should show symptoms message', () => {
    render(<SymptomsRegistry />)

    const moreSymptomsMessage = screen.getByText(/^¿Tienes otros síntomas\?$/)
    const registerSymptomsMessage = screen.getByText(
      /^Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este\.$/
    )

    expect(moreSymptomsMessage).toBeInTheDocument()
    expect(registerSymptomsMessage).toBeInTheDocument()
  })

  test('should show Cansancio symptom', () => {
    render(<SymptomsRegistry />)

    const cansancioText = screen.getByText(/^Cansancio$/)
    const minCansancioText = screen.getByText(/^Sin cansancio$/)
    const maxCansancioText = screen.getByText(/^Máximo cansancio$/)

    expect(cansancioText).toBeInTheDocument()
    expect(minCansancioText).toBeInTheDocument()
    expect(maxCansancioText).toBeInTheDocument()
  })

  test('Should change symptom level value when it moves to right side', async () => {
    render(<SymptomsRegistry />)

    const [sliderButton] = screen.getAllByRole('slider')
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })

    expect(await screen.findByText('3')).toBeVisible()
  })

  test('Should show the right symptom text', () => {
    render(<SymptomsRegistry />)

    const nauseaText = screen.getByText(/^Náusea$/)
    const minNauseaText = screen.getByText(/^Sin náusea$/)
    const maxNauseaText = screen.getByText(/^Máxima náusea$/)

    expect(nauseaText).toBeInTheDocument()
    expect(minNauseaText).toBeInTheDocument()
    expect(maxNauseaText).toBeInTheDocument()
  })

  test('should redirect to home when pressing cancel', () => {
    render(<SymptomsRegistry />)

    const cancelButton = screen.getByText(/^Cancelar$/)

    expect(cancelButton).toHaveAttribute('href', '/')
  })

  test('should redirect to succesful symptoms registry when pressing register', async () => {
    render(<SymptomsRegistry />)

    const registerButton = screen.getByText(/^Registrar$/)

    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_success?key=SuccessfulSymptomRegistry'
    )
  })

  test('should redirect to failed symptoms register when there is an error', async () => {
    render(<SymptomsRegistry />)
    jest.spyOn(axios, 'post').mockRejectedValue(null)

    const registerButton = screen.getByText(/^Registrar$/)
    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_error?error=FailedSymptomsRegistry'
    )
  })

  test('should press fever radio button', () => {
    render(<SymptomsRegistry />)

    const radioOption = screen
      .getAllByText(/^Sí$/)[0]
      .closest('label')
      ?.querySelector('input') as HTMLElement

    expect(radioOption).not.toBeChecked()
    userEvent.click(radioOption)
    expect(radioOption).toBeChecked()
  })

  test('should not render painbox when painLevel is invalid', () => {
    mockQuery['nivel-dolor'] = 'bla'
    render(<SymptomsRegistry />)

    expect(screen.queryByText(/^No duele$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele un poco$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele un poco más$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele mucho$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele mucho más$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele al máximo$/)).not.toBeInTheDocument
  })

  test('should not render painbox when painLevel is undefined', () => {
    mockQuery['nivel-dolor'] = undefined
    render(<SymptomsRegistry />)

    expect(screen.queryByText(/^No duele$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele un poco$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele un poco más$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele mucho$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele mucho más$/)).not.toBeInTheDocument
    expect(screen.queryByText(/^Duele al máximo$/)).not.toBeInTheDocument
  })

  test('should show rescue radio button', () => {
    render(<SymptomsRegistry />)

    const rescueRadioButton = screen
      .getAllByText(/^sí$/i)[2]
      .closest('label')
      ?.querySelector('input') as HTMLElement

    expect(rescueRadioButton['id']).toBe('Rescate-1')
    expect(rescueRadioButton).not.toBeChecked()
    userEvent.click(rescueRadioButton)
    expect(rescueRadioButton).toBeChecked()
  })

  test('should hint rescue message when pain is higher than two', () => {
    mockQuery['nivel-dolor'] = '4'
    render(<SymptomsRegistry />)
    expect(
      screen.queryByText(/^Se recomienda administrar rescate de analgesia$/)
    ).toBeInTheDocument()
  })

  test('should not show hint rescue message when pain is less or equals than two', () => {
    mockQuery['nivel-dolor'] = '2'
    render(<SymptomsRegistry />)
    expect(
      screen.queryByText(/^Se recomienda administrar rescate de analgesia$/)
    ).not.toBeInTheDocument()
  })
})
