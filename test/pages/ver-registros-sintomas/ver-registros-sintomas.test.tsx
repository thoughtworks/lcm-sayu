import React from 'react'
import { GetServerSidePropsContext } from 'next'
import typeorm from 'typeorm'
import { render, screen, cleanup } from 'test/testUtils'
import {
  SymptomsRegistryList,
  ViewRegistry,
  getServerSideProps,
} from 'src/steps/SymptomsRegistryList'
import {
  date,
  secondDate,
  thirdDate,
  secondHourDate,
  symptomsViewRegistries,
  threeDaySymptoms,
  oneDaySymptoms,
  onlyOneHourSymptoms,
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

describe('<SymptomsRegistryList />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('should display month/year of symptoms registered', () => {
    render(<SymptomsRegistryList viewRegistries={symptomsViewRegistries} />)

    const month = screen.getByText(/^Noviembre, 2020$/)
    expect(month).toBeInTheDocument()
  })

  test('should display days of symptoms registered', () => {
    render(<SymptomsRegistryList viewRegistries={symptomsViewRegistries} />)

    const dayWednesday18 = screen.getByText(/^Miércoles,18$/)
    const dayThursday = screen.getByText(/^Jueves,12$/)
    const dayWednesday11 = screen.getByText(/^Miércoles,11$/)
    const dayTuesday = screen.getByText(/^Martes,10$/)

    expect(dayWednesday18).toBeInTheDocument()
    expect(dayThursday).toBeInTheDocument()
    expect(dayWednesday11).toBeInTheDocument()
    expect(dayTuesday).toBeInTheDocument()
  })

  test('should display hour and symptoms value registered for Wednesday 12', () => {
    render(<SymptomsRegistryList viewRegistries={symptomsViewRegistries} />)

    const air = screen.getByText(/^1$/)
    const appetite = screen.getByText(/^2$/)
    const feverDeposition = screen.getAllByText(/^SI$/).length
    const nausea = screen.getByText(/^3$/)
    const pain = screen.getByText(/^4$/)
    const swallow = screen.getByText(/^5$/)
    const hour = screen.getByText(/^12:12$/)
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
    render(<SymptomsRegistryList viewRegistries={[]} />)

    const noRegistriesMessage = await screen.findByText(
      /^Aún no tienes registros$/
    )
    expect(noRegistriesMessage).toBeInTheDocument()
  })

  test('should display date when only one day is registered', () => {
    const oneDayRegistries: ViewRegistry[] = [
      {
        day: new Date('2020-11-13T00:47:56.014Z').getTime(),
        registries: [
          {
            airLevel: 1,
            appetiteLevel: 2,
            depositionLevel: true,
            feverLevel: true,
            id: 17,
            nauseaLevel: 3,
            painLevel: 4,
            swallowLevel: 5,
            symptomDate: new Date('2020-11-13T00:47:56.014Z').getTime(),
            tireLevel: 6,
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
            symptomDate: new Date('2020-11-13T00:43:17.630Z').getTime(),
            tireLevel: 7,
          },
        ],
      },
    ]

    render(<SymptomsRegistryList viewRegistries={oneDayRegistries} />)

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
    render(<SymptomsRegistryList viewRegistries={null} />)

    expect(mockPush).toHaveBeenCalledWith(
      '/_error?error=FailedSymptomsRetrieval'
    )
  })
})

describe('<SymptomsRegistryList /> server side', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  afterEach(cleanup)

  test('should return symptoms from different dates', async () => {
    const expectedViewSymptomRegistries = {
      props: {
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
        viewRegistries: null,
      },
    })
  })

  test('should return nothing when no symptoms are registered', async () => {
    mockFind = jest.fn().mockResolvedValue([])

    const viewSymptomsRegistries = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(viewSymptomsRegistries).toEqual({ props: { viewRegistries: [] } })
  })
})
