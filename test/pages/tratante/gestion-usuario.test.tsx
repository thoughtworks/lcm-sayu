import React from 'react'
import { cleanup, clearMocks, render, screen } from 'test/testUtils'

import UserManagement from 'pages/tratante/gestion-usuario'

jest.mock('next-auth/client', () => ({
  useSession: jest.fn().mockReturnValue([{ role: 'tratante' }, false]),
}))

describe('<UserManagement />', () => {
  beforeEach(() => {
    clearMocks()
    render(<UserManagement users={[]} />)
  })

  afterEach(cleanup)

  test('should show an "add user" link', () => {
    const addLink = screen.getByText(/^agregar usuario$/i)
    expect(addLink).toHaveAttribute('href', '/tratante/agregar-usuario')
    expect(screen.getByText(/^usuarios$/i)).toBeInTheDocument()
  })
})
