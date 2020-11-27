import { FunctionComponent } from 'react'
import { GenericError } from './GenericError'

const AuthenticationDeniedError: FunctionComponent = () => (
  <GenericError msg="Ha ocurrido un error durante la autenticación" />
)
export { AuthenticationDeniedError }
