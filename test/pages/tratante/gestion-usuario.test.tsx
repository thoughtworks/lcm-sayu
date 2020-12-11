import React from 'react'
import { GetServerSidePropsContext } from 'next'
import typeorm from 'typeorm'

import { cleanup, clearMocks, render, screen } from 'test/testUtils'
import UserManagement, {
  getServerSideProps,
} from 'pages/tratante/gestion-usuario'
import { Role } from 'src/model/Role'
import { UserDTO } from 'src/dto/UserDTO'

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tratante' }, false]),
}))

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const usersModel = [
  {
    createdAt: new Date(),
    id: 1,
    email: 'test1@mail.com',
    role: Role.CUIDADOR,
  },
  {
    createdAt: new Date(),
    id: 2,
    email: 'test2@mail.com',
    role: Role.TRATANTE,
  },
  {
    createdAt: new Date(),
    id: 3,
    email: 'test3@mail.com',
    role: Role.CUIDADOR,
  },
]
const mockFind = jest.fn().mockResolvedValue(usersModel)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ find: mockFind }),
    close: jest.fn(),
  }),
}))

describe('<UserManagement />', () => {
  beforeEach(() => {
    clearMocks()
  })

  afterEach(cleanup)

  test('should show an "add user" link', () => {
    render(<UserManagement users={[]} />)
    const addLink = screen.getByText(/^Agregar usuario$/)
    expect(addLink).toHaveAttribute('href', '/tratante/agregar-usuario')
    expect(screen.getByText(/^Usuarios$/)).toBeInTheDocument()
  })

  test('should show Estado and Usuario title', () => {
    render(<UserManagement users={[]} />)
    expect(screen.getByText(/^Estado$/)).toBeInTheDocument()
    expect(screen.getByText(/^Usuario$/)).toBeInTheDocument()
  })

  test('should show User List', () => {
    const userList = [
      { id: 1, email: 'test1@mail.com', role: Role.CUIDADOR },
      { id: 2, email: 'test2@mail.com', role: Role.TRATANTE },
    ]
    render(<UserManagement users={userList} />)
    expect(screen.getByText(/^test1@mail.com$/)).toBeInTheDocument()
    expect(screen.getByText(/^cuidador$/)).toBeInTheDocument()

    expect(screen.getByText(/^test2@mail.com$/)).toBeInTheDocument()
    expect(screen.getByText(/^tratante$/)).toBeInTheDocument()
  })

  test('should go to Agregar Usuario when there is no users', () => {
    render(<UserManagement users={[]} />)
    expect(mockPush).toHaveBeenCalledWith('/tratante/agregar-usuario')
  })
  test('should show a message error when User List is undefined', () => {
    render(<UserManagement users={undefined} />)
    expect(mockPush).toHaveBeenCalledWith('/_error?error=UserListError')
  })
})
describe('<UserManagement /> server side', () => {
  beforeEach(() => {
    clearMocks()
  })

  afterEach(cleanup)

  test('should return users', async () => {
    const users: UserDTO[] = [
      { id: 1, email: 'test1@mail.com', role: Role.CUIDADOR },
      { id: 2, email: 'test2@mail.com', role: Role.TRATANTE },
      { id: 3, email: 'test3@mail.com', role: Role.CUIDADOR },
    ]
    const expectedUsers = { props: { users } }
    const actualUsers = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )
    expect(actualUsers).toEqual(expectedUsers)
  })

  test('should return undefined when an error happened', async () => {
    jest
      .spyOn(typeorm, 'createConnection')
      .mockRejectedValue('Connection error')
    global.console.error = jest.fn()
    const actualUsers = await getServerSideProps(
      (null as unknown) as GetServerSidePropsContext
    )
    expect(actualUsers).toEqual({ props: { users: undefined } })
  })
})
