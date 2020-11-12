import { FunctionComponent } from 'react'

const AuthenticationDeniedError: FunctionComponent = () => (
  <main>
    <img src="img/failed_login.svg" />
    <p>Ha ocurrido un error durante la autenticación</p>
  </main>
)
export { AuthenticationDeniedError }
