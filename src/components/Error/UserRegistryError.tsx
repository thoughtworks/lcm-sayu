import React, { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const UserRegistryError: FunctionComponent = () => (
  <GenericError
    msg="Ha ocurrido un error al intentar guardar el usuario."
    retryLabel="Volver a lista de usuarios"
    retryUrl="/tratante/gestion-usuario"
  />
)

export { UserRegistryError }
