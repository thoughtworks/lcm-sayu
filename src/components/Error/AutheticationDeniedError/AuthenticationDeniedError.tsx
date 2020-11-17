import { FunctionComponent } from 'react'
import Link from 'src/components/Link'
import styles from './AutheticationDeniedError.module.scss'
const AuthenticationDeniedError: FunctionComponent = () => (
  <main className={styles['authetication-denied-error']}>
    <img src="img/failed_login.svg" />
    <p>Ha ocurrido un error durante la autenticación</p>
    <Link href="/" label="Volver a intentarlo" />
  </main>
)
export { AuthenticationDeniedError }
