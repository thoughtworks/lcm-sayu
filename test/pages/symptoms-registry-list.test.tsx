import React from 'react'
import { render, screen, cleanup } from 'test/testUtils'
import { SymptomsRegistryList } from 'src/steps/SymptomsRegistryList'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const emptyMockedAxios = axios as jest.Mocked<typeof axios>

const symptomsRegistries = [
  {
    airLevel: 1,
    appetiteLevel: 2,
    depositionLevel: true,
    feverLevel: true,
    id: 1,
    nauseaLevel: 3,
    painLevel: 4,
    swallowLevel: 5,
    symptomDate: '2020-11-18T15:12:40.528Z',
    tireLevel: 6,
  },
  {
    airLevel: 7,
    appetiteLevel: 7,
    depositionLevel: false,
    feverLevel: false,
    id: 17,
    nauseaLevel: 7,
    painLevel: 7,
    swallowLevel: 7,
    symptomDate: '2020-11-13T00:47:56.014Z',
    tireLevel: 7,
  },
  {
    airLevel: 7,
    appetiteLevel: 7,
    depositionLevel: false,
    feverLevel: false,
    id: 25,
    nauseaLevel: 7,
    painLevel: 7,
    swallowLevel: 7,
    symptomDate: '2020-11-13T00:43:17.630Z',
    tireLevel: 7,
  },
  {
    airLevel: 7,
    appetiteLevel: 7,
    depositionLevel: false,
    feverLevel: false,
    id: 33,
    nauseaLevel: 7,
    painLevel: 7,
    swallowLevel: 7,
    symptomDate: '2020-11-11T16:47:09.896Z',
    tireLevel: 7,
  },
  {
    airLevel: 7,
    appetiteLevel: 7,
    depositionLevel: false,
    feverLevel: false,
    id: 40,
    nauseaLevel: 7,
    painLevel: 7,
    swallowLevel: 7,
    symptomDate: '2020-11-10T23:57:34.122Z',
    tireLevel: 7,
  },
]

describe('<SymptomsRegistryList />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('should display month/year of symptoms registered', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: symptomsRegistries })
    render(<SymptomsRegistryList />)
    expect(mockedAxios.get).toHaveBeenCalled()

    const month = await screen.findByText(/noviembre, 2020/i)

    expect(month).toBeInTheDocument()
  })

  test('should display days of symptoms registered', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: symptomsRegistries })
    render(<SymptomsRegistryList />)
    expect(mockedAxios.get).toHaveBeenCalled()

    const dayWednesday18 = await screen.findByText(/miércoles,18/i)
    const dayThursday = await screen.findByText(/jueves,12/i)
    const dayWednesday11 = await screen.findByText(/miércoles,11/i)
    const dayTuesday = await screen.findByText(/martes,10/i)

    expect(dayWednesday18).toBeInTheDocument()
    expect(dayThursday).toBeInTheDocument()
    expect(dayWednesday11).toBeInTheDocument()
    expect(dayTuesday).toBeInTheDocument()
  })

  test('should display hour and symptoms value registered for Wednesday 12', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: symptomsRegistries })
    render(<SymptomsRegistryList />)
    expect(mockedAxios.get).toHaveBeenCalled()

    const air = await screen.findByText(/^1$/)
    const appetite = await screen.findByText(/^2$/)
    const feverDeposition = (await screen.findAllByText(/^SI$/)).length
    const nausea = await screen.findByText(/^3$/)
    const pain = await screen.findByText(/^4$/)
    const swallow = await screen.findByText(/^5$/)
    const hour = await screen.findByText(/^12:12$/)
    const tire = await screen.findByText(/^6$/)

    expect(air).toBeInTheDocument()
    expect(appetite).toBeInTheDocument()
    expect(feverDeposition).toBe(2)
    expect(nausea).toBeInTheDocument()
    expect(pain).toBeInTheDocument()
    expect(swallow).toBeInTheDocument()
    expect(hour).toBeInTheDocument()
    expect(tire).toBeInTheDocument()
  })

  test('should display message when no symptoms registered', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] })

    render(<SymptomsRegistryList />)
    expect(emptyMockedAxios.get).toHaveBeenCalled()

    const noRegistriesMessage = await screen.findByText(
      /Aún no tienes registros/i
    )
    expect(noRegistriesMessage).toBeInTheDocument()
  })

  test.skip('should display message when an error happens', async () => {
    mockedAxios.get.mockResolvedValueOnce(null)

    render(<SymptomsRegistryList />)
    expect(emptyMockedAxios.get).toHaveBeenCalled()

    const errorMessage = await screen.findByText(/Ocurrió un error/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
