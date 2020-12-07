import React from 'react'
import { GetServerSidePropsContext } from 'next'

import CarerView from 'pages/tratante/ver-cuidadores'
import { Role } from 'src/model/Role'
import { getServerSideProps } from 'src/steps/CarerView'
import { cleanup, clearMocks, render, screen, within } from 'test/testUtils'

const dateNow = Date.now()
global.Date.now = jest.fn().mockReturnValue(dateNow)
global.console.error = jest.fn()

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tratante' }, false]),
}))

const users = [
  { id: 1, name: 'test1', email: 'test1@test.com', role: Role.CUIDADOR },
  { id: 2, email: 'test2@test.com', role: Role.CUIDADOR },
  { id: 3, name: 'test3', email: 'test3@test.com', role: Role.CUIDADOR },
]

const mockFind = jest.fn().mockResolvedValue(users)
const mockFindOne = jest.fn().mockResolvedValue(null)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind, findOne: mockFindOne }),
    close: jest.fn(),
  }),
}))

describe('<CarerView />', () => {
  beforeEach(clearMocks)
  afterEach(cleanup)

  test('should show Cuidadores and Nombre title', () => {
    render(<CarerView carerList={[]} />)
    expect(screen.getByText(/^Cuidadores$/)).toBeInTheDocument()
    expect(screen.getByText(/^Nombre$/)).toBeInTheDocument()
  })

  test('should redirect to Agregrar Usuario when no user exists', async () => {
    render(<CarerView carerList={[]} />)
    expect(mockPush).toHaveBeenCalledWith('/tratante/agregar-usuario')
  })

  test('should show Carer List', async () => {
    const carerList = [{ id: 1, name: 'test1', lastUpdated: 1607025554814 }]
    render(<CarerView carerList={carerList} />)
    expect(screen.getByText(/^test1$/)).toBeInTheDocument()
    expect(
      screen.getByText(/^Última actualización: 03\/12\/2020$/)
    ).toBeInTheDocument()

    const carerRow = within(
      screen.getByText(/test1/).closest('tr') as HTMLElement
    )
    const detailedRegistryButton = carerRow
      .getByAltText(/^Ver registros de test1$/)
      .closest('a')
    expect(detailedRegistryButton).toHaveAttribute(
      'href',
      '/tratante/ver-historial/1'
    )
  })

  test('should show show last updated when it is null', async () => {
    const carerList = [{ id: 1, name: 'test1', lastUpdated: null }]
    render(<CarerView carerList={carerList} />)
    expect(screen.getByText(/^test1$/)).toBeInTheDocument()
    expect(screen.getByText(/^Sin registro$/)).toBeInTheDocument()

    const carerRow = within(
      screen.getByText(/test1/).closest('tr') as HTMLElement
    )
    const detailedRegistryButton = carerRow
      .getByAltText(/^Ver registros de test1$/)
      .closest('a')
    expect(detailedRegistryButton).toHaveAttribute(
      'href',
      '/tratante/ver-historial/1'
    )
  })
})

describe('<CarerView /> server side', () => {
  beforeEach(clearMocks)

  test('should return carers from DB', async () => {
    mockFindOne
      .mockResolvedValueOnce({ creationDate: new Date(dateNow) })
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ creationDate: new Date(dateNow) })

    const result = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(result).toEqual({
      props: {
        carerList: [
          { id: 1, name: 'test1', lastUpdated: dateNow },
          { id: 2, name: 'test2@test.com', lastUpdated: null },
          { id: 3, name: 'test3', lastUpdated: dateNow },
        ],
      },
    })
  })

  test('should log when there is an error and return an empty array', async () => {
    mockFindOne.mockRejectedValue(new Error('Custom error'))

    const result = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )

    expect(result).toEqual({ props: { carerList: [] } })
    expect(global.console.error).toHaveBeenCalledWith(new Error('Custom error'))
  })
})
