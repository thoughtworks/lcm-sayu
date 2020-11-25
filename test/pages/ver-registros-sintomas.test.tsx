import React from 'react'
import { GetServerSideProps } from 'next'
import { render, screen, cleanup } from 'test/testUtils'
import {
  SymptomsRegistryList,
  ViewRegistry,
  getServerSideProps,
} from 'src/steps/SymptomsRegistryList'

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

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
const symptomsViewRegistries: ViewRegistry[] = [
  {
    day: 'miércoles, 18 de noviembre de 2020',
    registries: [
      {
        airLevel: 1,
        appetiteLevel: 2,
        depositionLevel: true,
        feverLevel: true,
        id: 1,
        nauseaLevel: 3,
        painLevel: 4,
        swallowLevel: 5,
        symptomDate: new Date('2020-11-18T15:12:40.528Z'),
        tireLevel: 6,
      },
    ],
  },
  {
    day: 'jueves, 12 de noviembre de 2020',
    registries: [
      {
        airLevel: 7,
        appetiteLevel: 7,
        depositionLevel: false,
        feverLevel: false,
        id: 17,
        nauseaLevel: 7,
        painLevel: 7,
        swallowLevel: 7,
        symptomDate: new Date('2020-11-13T00:47:56.014Z'),
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
        symptomDate: new Date('2020-11-13T00:43:17.630Z'),
        tireLevel: 7,
      },
    ],
  },
  {
    day: 'miércoles, 11 de noviembre de 2020',
    registries: [
      {
        airLevel: 7,
        appetiteLevel: 7,
        depositionLevel: false,
        feverLevel: false,
        id: 33,
        nauseaLevel: 7,
        painLevel: 7,
        swallowLevel: 7,
        symptomDate: new Date('2020-11-11T16:47:09.896Z'),
        tireLevel: 7,
      },
    ],
  },
  {
    day: 'martes, 10 de noviembre de 2020',
    registries: [
      {
        airLevel: 7,
        appetiteLevel: 7,
        depositionLevel: false,
        feverLevel: false,
        id: 40,
        nauseaLevel: 7,
        painLevel: 7,
        swallowLevel: 7,
        symptomDate: new Date('2020-11-10T23:57:34.122Z'),
        tireLevel: 7,
      },
    ],
  },
]
const date = new Date('Fri Nov 20 2020 22:18:33')
const secondDate = new Date('Sat Nov 21 2020 22:18:33')
const twoDaySymptoms: Registry[] = [
  {
    id: 41,
    creationDate: date,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 42,
    creationDate: date,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 43,
    creationDate: date,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 44,
    creationDate: date,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 45,
    creationDate: date,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 46,
    creationDate: date,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 47,
    creationDate: date,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 48,
    creationDate: date,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
  {
    id: 49,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 1,
      name: 'Fiebre',
    },
  },
  {
    id: 50,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 2,
      name: 'Constipación',
    },
  },
  {
    id: 51,
    creationDate: secondDate,
    value: 1,
    symptom: {
      id: 3,
      name: 'Cansancio',
    },
  },
  {
    id: 52,
    creationDate: secondDate,
    value: 5,
    symptom: {
      id: 4,
      name: 'Falta de aire',
    },
  },
  {
    id: 53,
    creationDate: secondDate,
    value: 6,
    symptom: {
      id: 5,
      name: 'Dificultad para tragar',
    },
  },
  {
    id: 54,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 6,
      name: 'Apetito',
    },
  },
  {
    id: 55,
    creationDate: secondDate,
    value: 3,
    symptom: {
      id: 7,
      name: 'Náuseas',
    },
  },
  {
    id: 56,
    creationDate: secondDate,
    value: 4,
    symptom: {
      id: 8,
      name: 'Dolor',
    },
  },
]

describe('<SymptomsRegistryList />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(cleanup)

  test('should display month/year of symptoms registered', () => {
    render(<SymptomsRegistryList viewRegistries={symptomsViewRegistries} />)

    const month = screen.getByText(/noviembre, 2020/i)
    expect(month).toBeInTheDocument()
  })

  test('should display days of symptoms registered', () => {
    render(<SymptomsRegistryList viewRegistries={symptomsViewRegistries} />)

    const dayWednesday18 = screen.getByText(/miércoles,18/i)
    const dayThursday = screen.getByText(/jueves,12/i)
    const dayWednesday11 = screen.getByText(/miércoles,11/i)
    const dayTuesday = screen.getByText(/martes,10/i)

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
      /Aún no tienes registros/i
    )
    expect(noRegistriesMessage).toBeInTheDocument()
  })

  test('should display date when only one day is registered', () => {
    const oneDayRegistries: ViewRegistry[] = [
      {
        day: 'jueves, 12 de noviembre de 2020',
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
            symptomDate: new Date('2020-11-13T00:47:56.014Z'),
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
            symptomDate: new Date('2020-11-13T00:43:17.630Z'),
            tireLevel: 7,
          },
        ],
      },
    ]

    render(<SymptomsRegistryList viewRegistries={oneDayRegistries} />)

    const dayThursday = screen.getByText(/jueves,12/i)
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

describe.skip('<SymptomsRegistryList /> server side', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return symptoms from different dates', async () => {
    await getServerSideProps()
  })
})
