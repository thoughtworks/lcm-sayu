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
const mockQuery = {
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

  test('Should show the right symptom text', () => {
    const nauseaText = screen.getByText(/^Náusea$/i)
    expect(nauseaText).toBeInTheDocument()
    const minNauseaText = screen.getByText(/Sin náusea/i)
    expect(minNauseaText).toBeInTheDocument()
    const maxNauseaText = screen.getByText(/Máxima náusea/i)
    expect(maxNauseaText).toBeInTheDocument()
  })

  test('should redirect to home when pressing cancel', () => {
    const cancelButton = screen.getByText(/Cancelar/i)
    expect(cancelButton).toHaveAttribute('href', '/')
  })

  test('should redirect to succesful symptoms registry when pressing register', async () => {
    const registerButton = screen.getByText(/Registrar/i)
    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_success?key=SuccessfulSymptomRegistry'
    )
  })

  test('should redirect to failed symptoms register when there is an error', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue(null)
    const registerButton = screen.getByText(/Registrar/i)
    userEvent.click(registerButton)
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(mockPush).toHaveBeenCalledWith(
      '/_error?error=FailedSymptomsRegistry'
    )
  })

  test('should press fever radio button', () => {
    const radioOption = screen
      .getAllByText(/^sí$/i)[0]
      .closest('label')
      ?.querySelector('input') as HTMLElement
    expect(radioOption).not.toBeChecked()
    userEvent.click(radioOption)
    expect(radioOption).toBeChecked()
  })

  test('should not render painbox when painLevel is invalid', () => {
    mockQuery['nivel-dolor'] = 'bla'
    render(<SymptomsRegistry />)

    expect(screen.queryByText(/sin dolor/i)).not.toBeInTheDocument
    expect(screen.queryByText(/duele un poco/i)).not.toBeInTheDocument
    expect(screen.queryByText(/duele un poco más/i)).not.toBeInTheDocument
    expect(screen.queryByText(/duele aún más/i)).not.toBeInTheDocument
    expect(screen.queryByText(/duele mucho/i)).not.toBeInTheDocument
    expect(screen.queryByText(/el peor dolor/i)).not.toBeInTheDocument
  })
})
