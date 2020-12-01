import React from 'react'
import { GetServerSidePropsContext } from 'next'
import typeorm from 'typeorm'
import { render, screen, cleanup, clearMocks } from 'test/testUtils'
import SymptomsRegistryList, {
  getServerSideProps,
} from 'src/steps/SymptomsRegistryList'
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
  oneDayMonthRegistries,
} from './ver-registros-sintomas-data'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

let mockFind = jest.fn().mockResolvedValue(threeDaySymptoms)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind }),
    close: jest.fn(),
  }),
}))

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tutor' }, false]),
}))

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
})

describe('<SymptomsRegistryList /> server side', () => {
  beforeEach(clearMocks)

  afterEach(cleanup)

  test('should return symptoms from different dates', async () => {
    const expectedViewSymptomRegistries = {
      props: {
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 8,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 6,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                  },
                ],
              },
              {
                day: secondDate.getTime(),
                registries: [
                  {
                    id: 16,
                    symptomDate: secondDate.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                  },
                ],
              },
              {
                day: thirdDate.getTime(),
                registries: [
                  {
                    id: 24,
                    symptomDate: thirdDate.getTime(),
                    painLevel: 2,
                    tireLevel: 2,
                    appetiteLevel: 3,
                    nauseaLevel: 6,
                    swallowLevel: 9,
                    airLevel: 6,
                    depositionLevel: false,
                    feverLevel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should return symptoms from same date', async () => {
    mockFind = jest.fn().mockResolvedValue(oneDaySymptoms)
    const expectedViewSymptomRegistries = {
      props: {
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 8,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                  },
                  {
                    id: 16,
                    symptomDate: secondHourDate.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should return symptoms for only one day and hour', async () => {
    mockFind = jest.fn().mockResolvedValue(onlyOneHourSymptoms)
    const expectedViewSymptomRegistries = {
      props: {
        monthRegistries: [
          {
            month: 10,
            year: 2020,
            viewRegistries: [
              {
                day: date.getTime(),
                registries: [
                  {
                    id: 8,
                    symptomDate: date.getTime(),
                    painLevel: 4,
                    tireLevel: 1,
                    appetiteLevel: 4,
                    nauseaLevel: 3,
                    swallowLevel: 6,
                    airLevel: 5,
                    depositionLevel: true,
                    feverLevel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    const viewSymptomsRegistries = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(viewSymptomsRegistries).toEqual(expectedViewSymptomRegistries)
  })

  test('should log error and return 500 HTTP code when there is an error', async () => {
    jest
      .spyOn(typeorm, 'createConnection')
      .mockRejectedValue('Connection error')
    global.console.error = jest.fn()

    const response = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(response).toEqual({
      props: {
        monthRegistries: null,
      },
    })
  })

  test('should return nothing when no symptoms are registered', async () => {
    mockFind = jest.fn().mockResolvedValue([])

    const viewMonthSymptomsRegistries = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(viewMonthSymptomsRegistries).toEqual({
      props: { monthRegistries: [] },
    })
  })
})

describe('<SymptomsRegistryList /> legend', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  afterEach(cleanup)

  test('should show symptom names in legend', async () => {
    render(<SymptomsRegistryList monthRegistries={[]} />)

    const pain = screen.getByText(/^Dolor$/)
    const tiredness = screen.getByText(/^Cansancio$/)
    const apetite = screen.getByText(/^Apetito$/)
    const nausea = screen.getByText(/^Náuseas$/)
    const swallow = screen.getByText(/^Dificultad para tragar$/)
    const air = screen.getByText(/^Falta de aire$/)
    const deposition = screen.getByText(/^Deposiciones$/)
    const fever = screen.getByText(/^Fiebre$/)
    expect(pain).toBeInTheDocument()
    expect(tiredness).toBeInTheDocument()
    expect(apetite).toBeInTheDocument()
    expect(nausea).toBeInTheDocument()
    expect(swallow).toBeInTheDocument()
    expect(air).toBeInTheDocument()
    expect(deposition).toBeInTheDocument()
    expect(fever).toBeInTheDocument()
  })
})
