import React from 'react'
import axios from 'axios'

import {
  cleanup,
  clearMocks,
  render,
  screen,
  userEvent,
  waitFor,
} from 'test/testUtils'
import AddUser, { getServerSideProps } from 'pages/tratante/agregar-usuario'
import { GetServerSidePropsContext } from 'next'
import { Role } from 'src/model/Role'
import { UserDTO } from 'src/dto/UserDTO'
import { Status } from 'src/model/Status'

jest.mock('axios')

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tratante' }, false]),
}))

const mockPush = jest.fn().mockResolvedValue(null)
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const userModel = {
  createdAt: new Date(),
  id: 1,
  email: 'test1@mail.com',
  role: Role.CUIDADOR,
  status: Status.ACTIVO,
}
let mockFindOne = jest.fn().mockResolvedValue(userModel)
jest.mock('typeorm', () => ({
  createConnection: () => ({
    getRepository: () => ({ findOne: mockFindOne }),
    close: jest.fn(),
  }),
}))

describe('<AddUser /> create', () => {
  beforeEach(() => {
    clearMocks()
    render(<AddUser user={null} error={false} />)
  })

  afterEach(cleanup)

  test('should render', () => {
    expect(screen.getByText(/^agregar usuario$/i)).toBeInTheDocument()
  })

  test('should validate email', async () => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { emailAlreadyExist: false } })
    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'test@test.com')

    expect(screen.getByText(/^Rol de la persona$/)).toBeInTheDocument()
    const tratanteRadioButton = screen.getByText(/^Profesional tratante$/)
    userEvent.click(tratanteRadioButton)

    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/validate-email', {
        email: 'test@test.com',
      })
    )
  })

  test('should add user successfully', async () => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { emailAlreadyExist: false } })

    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'test@test.com')

    expect(screen.getByText(/^Rol de la persona$/)).toBeInTheDocument()
    const tratanteRadioButton = screen.getByText(/^Profesional tratante$/)
    userEvent.click(tratanteRadioButton)

    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/user-save', {
        userEmail: 'test@test.com',
        role: 'tratante',
        status: 'activo',
      })
    )

    expect(mockPush).toHaveBeenCalledWith(
      '/_success?key=SuccessfulUserRegistry'
    )
  })

  test('should show required email error when email is empty', async () => {
    expect(
      screen.queryByText(/^Debes ingresar correo electrónico$/)
    ).not.toBeInTheDocument()
    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)
    expect(
      await screen.findByText(/^Debes ingresar correo electrónico$/)
    ).toBeInTheDocument()
  })

  test('should show error message when email is not valid', async () => {
    expect(
      screen.queryByText(/^Debes ingresar correo electrónico válido$/)
    ).not.toBeInTheDocument()
    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'correo no valido')
    userEvent.tab()
    expect(
      await screen.findByText(/^Debes ingresar correo electrónico válido$/)
    ).toBeInTheDocument()
  })

  test('should have a cancel button', async () => {
    const cancelButton = screen.getByText(/^Cancelar$/)

    expect(cancelButton).toHaveAttribute('href', '/tratante/gestion-usuario')
  })

  test('should redirect to error page when there is an error', async () => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { emailAlreadyExist: false } })
      .mockResolvedValueOnce({ data: { emailAlreadyExist: false } })
      .mockRejectedValueOnce(null)

    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'test@test.com')

    expect(screen.getByText(/^Rol de la persona$/)).toBeInTheDocument()
    const tratanteRadioButton = screen.getByText(/^Profesional tratante$/)
    userEvent.click(tratanteRadioButton)

    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/user-save', {
        userEmail: 'test@test.com',
        role: 'tratante',
        status: 'activo',
      })
    )

    expect(mockPush).toHaveBeenCalledWith('/_error?error=UserRegistryError')
  })

  test('should show error message when email already exist', async () => {
    jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { emailAlreadyExist: true } })
    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'test@test.com')
    userEvent.tab()
    expect(
      await screen.findByText(
        /^Debes ingresar un correo que no esté duplicado$/
      )
    ).toBeInTheDocument()
  })

  test('should have a radiobutton to change user state', () => {
    expect(screen.getByText(/^Estado$/)).toBeInTheDocument()
    expect(screen.getByText(/^Activo$/)).toBeInTheDocument()
    expect(screen.getByText(/^Inactivo$/)).toBeInTheDocument()
  })
})

describe('<AddUser /> edit', () => {
  beforeEach(() => {
    clearMocks()
  })

  afterEach(cleanup)

  test('should redirect to error page on error', async () => {
    render(<AddUser user={null} error={true} />)
    expect(mockPush).toHaveBeenCalledWith('/_error?error=UserEditError')
  })
  test('should edit user successfully', async () => {
    const UserDTO = {
      id: 1,
      email: 'test1@mail.com',
      role: Role.CUIDADOR,
      status: Status.ACTIVO,
    }
    render(<AddUser user={UserDTO} error={false} />)
    expect(screen.getByText(/^Rol de la persona$/)).toBeInTheDocument()
    const tratanteRadioButton = screen.getByText(/^Profesional tratante$/)
    userEvent.click(tratanteRadioButton)

    const statusRadioButton = screen.getByText(/^Inactivo$/)
    userEvent.click(statusRadioButton)

    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/user-save', {
        userEmail: 'test1@mail.com',
        role: 'tratante',
        status: 'inactivo',
      })
    )

    expect(mockPush).toHaveBeenCalledWith(
      '/_success?key=SuccessfulUserRegistry'
    )
  })
})

describe('<AddUser/> Server Side', () => {
  test('should return a user', async () => {
    const context = ({
      req: {},
      query: { usuario: 1 },
    } as unknown) as GetServerSidePropsContext
    const user: UserDTO = {
      id: 1,
      email: 'test1@mail.com',
      role: Role.CUIDADOR,
      status: Status.ACTIVO,
    }
    const error = false
    const expectedUser = { props: { user, error } }

    const actualUser = await getServerSideProps(context)
    expect(actualUser).toEqual(expectedUser)
  })

  test('should return a null user and a true error flag when a service error happens', async () => {
    global.console.error = jest.fn()
    const context = ({
      req: {},
      query: { usuario: 1 },
    } as unknown) as GetServerSidePropsContext
    mockFindOne = jest.fn().mockResolvedValue(null)

    const actualUser = await getServerSideProps(context)

    expect(actualUser).toEqual({ props: { user: null, error: true } })
    expect(global.console.error).toHaveBeenCalledWith(
      new Error('User not found: 1')
    )
  })
  test('should return a null when userId is not present', async () => {
    global.console.error = jest.fn()
    const context = ({
      req: {},
      query: {},
    } as unknown) as GetServerSidePropsContext

    const actualUser = await getServerSideProps(context)

    expect(actualUser).toEqual({ props: { user: null, error: false } })
  })
})
