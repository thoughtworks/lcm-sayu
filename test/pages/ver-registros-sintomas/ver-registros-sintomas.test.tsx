import React from 'react'
import { GetServerSidePropsContext } from 'next'
import nextauthclient, { Session } from 'next-auth/client'
import axios from 'axios'

import SymptomsRegistryList, {
  getServerSideProps,
} from 'src/steps/SymptomsRegistryList'
import { Role } from 'src/model/Role'

import {
  render,
  screen,
  cleanup,
  clearMocks,
  userEvent,
  waitFor,
} from 'test/testUtils'

import {
  date,
  secondDate,
  thirdDate,
  secondHourDate,
  symptomsMonthRegistries,
  threeDaySymptoms,
  oneDaySymptoms,
  onlyOneHourSymptoms,
  differentMonthViewRegistry,
  differentMonthSymptoms,
  oneDayMonthRegistries,
  monday,
  tuesday,
} from './ver-registros-sintomas-data'

const mockPush = jest.fn().mockResolvedValue(null)
const mockReload = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    reload: mockReload,
  }),
}))

const mockFind = jest.fn().mockResolvedValue(threeDaySymptoms)
const mockFindOne = jest.fn().mockResolvedValue(null)
const mockBetween = jest.fn().mockResolvedValue(null)
const mockConnection = {
  getRepository: () => ({
    find: mockFind,
    findOne: mockFindOne,
  }),
  close: jest.fn(),
}
jest.mock('typeorm', () => ({
  createConnection: () => mockConnection,
  getConnection: () => mockConnection,
  Between: () => ({ Between: mockBetween }),
}))

jest.mock('next-auth/client')
const mockNextAuthClient = nextauthclient as jest.Mocked<typeof nextauthclient>
mockNextAuthClient.useSession.mockReturnValue([
  ({ role: 'cuidador' } as unknown) as Session,
  false,
])
mockNextAuthClient.getSession.mockResolvedValue(({
  role: 'cuidador',
} as unknown) as Session)

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
mockAxios.delete.mockResolvedValue(null)

global.console.error = jest.fn()

describe('<SymptomsRegistryList />', () => {
  beforeEach(clearMocks)

  afterEach(cleanup)

  test('should display month/year of symptoms registered', () => {
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)

    const month = screen.getByText(/^Noviembre, 2020$/)
    expect(month).toBeInTheDocument()
  })

  test('should display month/year of symptoms registered when two different months', () => {
    render(
      <SymptomsRegistryList monthRegistries={differentMonthViewRegistry} />
    )

    const november = screen.getByText(/^Noviembre, 2020$/)
    const december = screen.getByText(/^Diciembre, 2020$/)
    expect(november).toBeInTheDocument()
    expect(december).toBeInTheDocument()
  })

  test('should display days of symptoms registered', () => {
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)

    const dayWednesday18 = screen.getByText(/^Miércoles,18$/)
    const dayThursday = screen.getByText(/^Jueves,12$/)
    const dayWednesday11 = screen.getByText(/^Miércoles,11$/)
    const dayTuesday = screen.getByText(/^Lunes,09$/)

    expect(dayWednesday18).toBeInTheDocument()
    expect(dayThursday).toBeInTheDocument()
    expect(dayWednesday11).toBeInTheDocument()
    expect(dayTuesday).toBeInTheDocument()
  })

  test('should display hour and symptoms value registered for Wednesday 18', () => {
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)

    const air = screen.getByText(/^1$/)
    const appetite = screen.getByText(/^2$/)
    const feverDeposition = screen.getAllByText(/^SI$/).length
    const nausea = screen.getByText(/^3$/)
    const pain = screen.getByText(/^4$/)
    const swallow = screen.getByText(/^5$/)
    const hour = screen.getByText(/^12:09$/)
    const tire = screen.getByText(/^6$/)

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
    render(<SymptomsRegistryList monthRegistries={[]} />)

    const noRegistriesMessage = await screen.findByText(
      /^Aún no tienes registros$/
    )
    expect(noRegistriesMessage).toBeInTheDocument()
  })

  test('should display date when only one day is registered', () => {
    render(<SymptomsRegistryList monthRegistries={oneDayMonthRegistries} />)

    const dayThursday = screen.getByText(/^Jueves,12$/)
    expect(dayThursday).toBeInTheDocument()

    const air = screen.getByText(/^1$/)
    const appetite = screen.getByText(/^2$/)
    const feverDeposition = screen.getAllByText(/^SI$/).length
    const nausea = screen.getByText(/^3$/)
    const pain = screen.getByText(/^4$/)
    const swallow = screen.getByText(/^5$/)
    const hour = screen.getByText(/^21:47$/)
    const tire = screen.getByText(/^6$/)

    expect(air).toBeInTheDocument()
    expect(appetite).toBeInTheDocument()
    expect(feverDeposition).toBe(2)
    expect(nausea).toBeInTheDocument()
    expect(pain).toBeInTheDocument()
    expect(swallow).toBeInTheDocument()
    expect(hour).toBeInTheDocument()
    expect(tire).toBeInTheDocument()
  })

  test('should display message when an error happens', async () => {
    render(<SymptomsRegistryList monthRegistries={null} />)

    expect(mockPush).toHaveBeenCalledWith(
      '/_error?error=FailedSymptomsRetrieval'
    )
  })

  test('should render name when it is present', async () => {
    render(
      <SymptomsRegistryList
        registryOwner="Registry Owner"
        monthRegistries={oneDayMonthRegistries}
      />
    )

    expect(screen.getByText(/Registry Owner/)).toBeInTheDocument()
  })

  test('should show symptom names in legend', async () => {
    render(<SymptomsRegistryList monthRegistries={[]} />)

    expect(screen.getByText(/^Dolor$/)).toBeInTheDocument()
    expect(screen.getByText(/^Cansancio$/)).toBeInTheDocument()
    expect(screen.getByText(/^Apetito$/)).toBeInTheDocument()
    expect(screen.getByText(/^Náuseas$/)).toBeInTheDocument()
    expect(screen.getByText(/^Dificultad para tragar$/)).toBeInTheDocument()
    expect(screen.getByText(/^Falta de aire$/)).toBeInTheDocument()
    expect(screen.getByText(/^Deposiciones$/)).toBeInTheDocument()
    expect(screen.getByText(/^Fiebre$/)).toBeInTheDocument()
    expect(screen.getByText(/^Rescate de analgesia$/)).toBeInTheDocument()
  })

  test('should remove registry when delete button is clicked', async () => {
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)
    const deleteButton = screen.getByTitle(
      /^Borrar registro Miércoles,18 12:09$/
    )
    userEvent.click(deleteButton)
    expect(screen.getByText(/^Eliminar registro$/)).toBeInTheDocument()
    expect(
      screen.getByText(
        /^Confirmas que deseas eliminar el registro de síntomas del día\sMiércoles,18\sde\sNoviembre\sdel\s2020\sa las\s12:09$/
      )
    ).toBeInTheDocument()
    const definetelyDeleteButton = screen.getByText(/^Eliminar$/)
    userEvent.click(definetelyDeleteButton)

    await waitFor(() =>
      expect(mockAxios.delete).toHaveBeenCalledWith(
        '/api/remove-registries/2020/11/18/12/9/40'
      )
    )

    expect(mockReload).toHaveBeenCalled()
  })

  test('should hide modal when cancel button is clicked', async () => {
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)
    const deleteButton = screen.getByTitle(
      /^Borrar registro Miércoles,18 12:09$/
    )
    userEvent.click(deleteButton)

    expect(screen.getByText(/^Eliminar registro$/)).toBeInTheDocument()

    const cancelButton = screen.getByText(/^Cancelar$/)
    userEvent.click(cancelButton)

    expect(screen.queryByText(/^Eliminar registro$/)).not.toBeInTheDocument()
  })

  test('should redirect to error page when there is an error', async () => {
    mockAxios.delete.mockRejectedValueOnce(null)
    render(<SymptomsRegistryList monthRegistries={symptomsMonthRegistries} />)
    const deleteButton = screen.getByTitle(
      /^Borrar registro Miércoles,18 12:09$/
    )
    userEvent.click(deleteButton)

    const definetelyDeleteButton = screen.getByText(/^Eliminar$/)
    userEvent.click(definetelyDeleteButton)

    await waitFor(() => expect(axios.delete).toHaveBeenCalled())

    expect(mockPush).toHaveBeenCalledWith('/_error?error=FailedRegistryRemove')
  })
})

describe('<SymptomsRegistryList /> server side', () => {
  const context = ({
    req: {},
    query: { cuidador: '2' },
  } as unknown) as GetServerSidePropsContext
  beforeEach(() => {
    clearMocks()

    mockNextAuthClient.getSession.mockResolvedValue(({
      user: { name: 'Test 1' },
      role: Role.CUIDADOR,
    } as unknown) as Session)

    mockFindOne.mockResolvedValue({ name: 'Test 1' })
  })

  afterEach(cleanup)

  test('should return symptoms from different dates', async () => {
    const expectedViewSymptomRegistries = {
      props: {
        registryOwner: null,
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 9,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 6,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: true,
                  },
                ],
              },
              {
                day: secondDate.getTime(),
                registries: [
                  {
                    id: 18,
                    symptomDate: secondDate.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: false,
                  },
                ],
              },
              {
                day: thirdDate.getTime(),
                registries: [
                  {
                    id: 27,
                    symptomDate: thirdDate.getTime(),
                    painLevel: 2,
                    tireLevel: 2,
                    appetiteLevel: 3,
                    nauseaLevel: 6,
                    swallowLevel: 9,
                    airLevel: 6,
                    depositionLevel: false,
                    feverLevel: true,
                    rescueLevel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(context)

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should return symptoms from different months', async () => {
    mockFind.mockResolvedValue(differentMonthSymptoms)
    const expectedViewSymptomRegistries = {
      props: {
        registryOwner: null,
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: monday.getTime(),
                registries: [
                  {
                    id: 9,
                    symptomDate: monday.getTime(),
                    painLevel: 4,
                    tireLevel: 6,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: true,
                  },
                ],
              },
            ],
          },
          {
            month: 11,
            year: 2020,
            viewRegistries: [
              {
                day: tuesday.getTime(),
                registries: [
                  {
                    id: 18,
                    symptomDate: tuesday.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(context)
    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should return symptoms from same date', async () => {
    mockFind.mockResolvedValue(oneDaySymptoms)
    const expectedViewSymptomRegistries = {
      props: {
        registryOwner: null,
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 9,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: true,
                  },
                  {
                    id: 18,
                    symptomDate: secondHourDate.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(context)

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should return symptoms for only one day and hour', async () => {
    mockFind.mockResolvedValue(onlyOneHourSymptoms)
    const expectedViewSymptomRegistries = {
      props: {
        registryOwner: null,
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 9,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                    rescueLevel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(context)

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should log error and return 500 HTTP code when there is an error', async () => {
    mockFindOne.mockRejectedValue('Connection error')
    global.console.error = jest.fn()

    const response = await getServerSideProps(context)

    expect(response).toEqual({
      props: {
        monthRegistries: null,
        registryOwner: null,
      },
    })
  })

  test('should return nothing when no symptoms are registered', async () => {
    mockFind.mockResolvedValue([])

    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: [], registryOwner: null },
    })
  })

  test('should return null when user is not logged in', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(null)

    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: null },
    })
  })

  test('should return null when is logged in, but user is incorrect', async () => {
    mockFindOne.mockResolvedValue({ id: 1 })

    context.query = { cuidador: '2' }
    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: null },
    })
  })

  test('should return only registries belonging to cuidador user', async () => {
    await getServerSideProps(context)

    expect(mockFind).toHaveBeenCalledWith({
      order: { creationDate: 'DESC' },
      relations: ['symptom'],
      where: {
        creationDate: { Between: expect.any(Function) },
        user: { name: 'Test 1' },
      },
    })
  })

  test('should return registries belonging to any user if role is tratante', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(({
      user: { name: 'Test 1' },
      role: Role.TRATANTE,
    } as unknown) as Session)

    mockFindOne.mockResolvedValue({ name: 'Test 2' })
    mockFind.mockResolvedValue(onlyOneHourSymptoms)

    const result = await getServerSideProps(context)

    expect(result).toEqual({
      props: {
        registryOwner: 'Test 2',
        monthRegistries: [
          {
            month: 10,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    airLevel: 5,
                    appetiteLevel: 4,
                    depositionLevel: true,
                    feverLevel: true,
                    id: 9,
                    nauseaLevel: 3,
                    painLevel: 4,
                    rescueLevel: true,
                    swallowLevel: 6,
                    symptomDate: date.getTime(),
                    tireLevel: 1,
                  },
                ],
              },
            ],
            year: 2020,
          },
        ],
      },
    })
  })

  test('should return null registry owner if no user is found and user is tratante', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(({
      user: { name: 'Test 1' },
      role: Role.TRATANTE,
    } as unknown) as Session)

    mockFindOne.mockResolvedValue(null)
    mockFind.mockResolvedValue(onlyOneHourSymptoms)

    const result = await getServerSideProps(context)

    expect(result).toEqual({
      props: {
        registryOwner: null,
        monthRegistries: null,
      },
    })
  })

  test('should return null when user is not logged in', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(null)

    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: null },
    })
  })

  test('should return null when is logged in, but user is incorrect', async () => {
    mockFindOne.mockResolvedValue({ id: 1 })

    context.query = { cuidador: '2' }
    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: null },
    })
  })

  test('should return null when query is not a number', async () => {
    mockFindOne.mockResolvedValue({ id: 1 })

    context.query = { cuidador: 'test' }
    const viewMonthSymptomsRegistries = await getServerSideProps(context)

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: null },
    })
  })

  test('should return only registries belonging to cuidador user', async () => {
    await getServerSideProps(context)

    expect(mockFind).toHaveBeenCalledWith({
      order: { creationDate: 'DESC' },
      relations: ['symptom'],
      where: {
        creationDate: { Between: expect.any(Function) },
        user: { name: 'Test 1' },
      },
    })
  })

  test('should return registries belonging to any user if role is tratante', async () => {
    mockNextAuthClient.getSession.mockResolvedValue(({
      user: { name: 'Test 1' },
      role: Role.TRATANTE,
    } as unknown) as Session)

    mockFindOne.mockResolvedValue({ name: 'Test 2' })
    mockFind.mockResolvedValue(onlyOneHourSymptoms)

    const result = await getServerSideProps(context)

    expect(result).toEqual({
      props: {
        registryOwner: 'Test 2',
        monthRegistries: [
          {
            month: 10,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    airLevel: 5,
                    appetiteLevel: 4,
                    depositionLevel: true,
                    feverLevel: true,
                    id: 9,
                    nauseaLevel: 3,
                    painLevel: 4,
                    rescueLevel: true,
                    swallowLevel: 6,
                    symptomDate: date.getTime(),
                    tireLevel: 1,
                  },
                ],
              },
            ],
            year: 2020,
          },
        ],
      },
    })
  })
})
