import React from 'react'
import axios from 'axios'

import { cleanup, render, screen, userEvent, waitFor } from 'test/testUtils'
import AddUser from 'pages/tratante/agregar-usuario'

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

describe('<AddUser />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AddUser />)
  })

  afterEach(cleanup)

  test('should render', () => {
    expect(screen.getByText(/^agregar usuario$/i)).toBeInTheDocument()
  })

  test('should show add user form', async () => {
    const emailInput = screen.getByText(/^Correo electrónico$/)
    userEvent.type(emailInput, 'test@test.com')

    expect(screen.getByText(/^Rol de la persona$/)).toBeInTheDocument()
    const tratanteRadioButton = screen.getByText(/^Profesional tratante$/)
    userEvent.click(tratanteRadioButton)

    const submitButton = screen.getByText(/^Guardar$/)
    userEvent.click(submitButton)

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('/api/registry-save', {
        userEmail: 'test@test.com',
        role: 'tratante',
      })
    )

    expect(mockPush).toHaveBeenCalledWith('/registro-exitoso-usuario')
  })

  test('should show required email error when when email is empty', async () => {
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
})
