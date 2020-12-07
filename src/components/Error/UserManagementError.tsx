import React, { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const UserManagementError: FunctionComponent = () => (
  <GenericError
    msg="Ha ocurrido un error al intentar mostrar los usuarios."
    retryUrl="/"
  />
)

export { UserManagementError }
