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
    render(<SymptomsRegistry />)
  })

  afterEach(cleanup)

  test('Should render pain box info', () => {
    const painBoxDescription = screen.getByText(/^No duele$/)
    expect(painBoxDescription).toBeInTheDocument()
  })

  test('should show title message', () => {
    const introMessage = screen.getByText(
      /Cuéntale a sayu cómo te sientes hoy/i
    )
    expect(introMessage).toBeInTheDocument()
  })

  test('should show symptoms message', () => {
    const moreSymptomsMessage = screen.getByText(/^¿Tienes otros síntomas\?$/)
    expect(moreSymptomsMessage).toBeInTheDocument()
    const registerSymptomsMessage = screen.getByText(
      /^Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este\.$/
    )
    expect(registerSymptomsMessage).toBeInTheDocument()
  })

  test('should show Cansancio symptom', () => {
    const cansancioText = screen.getByText(/^Cansancio$/)
    expect(cansancioText).toBeInTheDocument()
    const minCansancioText = screen.getByText(/^Sin cansancio$/)
    expect(minCansancioText).toBeInTheDocument()
    const maxCansancioText = screen.getByText(/^Máximo cansancio$/)
    expect(maxCansancioText).toBeInTheDocument()
  })

  test('Should change symptom level value when it moves to right side', async () => {
    const [sliderButton] = screen.getAllByRole('slider')
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    expect(await screen.findByText('3')).toBeVisible()
  })

  test('Should show the right symptom text', () => {
    const nauseaText = screen.getByText(/^Náusea$/)
    expect(nauseaText).toBeInTheDocument()
    const minNauseaText = screen.getByText(/^Sin náusea$/)
    expect(minNauseaText).toBeInTheDocument()
    const maxNauseaText = screen.getByText(/^Máxima náusea$/)
    expect(maxNauseaText).toBeInTheDocument()
  })

  test('should redirect to home when pressing cancel', () => {
    const cancelButton = screen.getByText(/^Cancelar$/)
    expect(cancelButton).toHaveAttribute('href', '/')
  })

  test('should redirect to succesful symptoms registry when pressing register', async () => {
    const registerButton = screen.getByText(/^Registrar$/)
    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_success?key=SuccessfulSymptomRegistry'
    )
  })

  test('should redirect to failed symptoms register when there is an error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue(null)
    const registerButton = screen.getByText(/^Registrar$/)
    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_error?error=FailedSymptomsRegistry'
    )
  })

  test('should press fever radio button', () => {
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
})
