import { FunctionComponent } from 'react'
import { GenericError } from '.'

const UserEditError: FunctionComponent = () => (
  <GenericError
    msg="Ha ocurrido un error al intentar editar el usuario"
    retryUrl="/tratante/gestion-usuario"
  />
)
export { UserEditError }
