import { FunctionComponent } from 'react'

import styles from './GenericError.module.scss'

const InactiveUser: FunctionComponent<{ msg?: string; retryUrl?: string }> = ({
  msg = 'Usuario inactivo',
}) => (
  <main className={styles['error']}>
    <img src="/img/fail.svg" />
    <p>{msg}</p>
  </main>
)
export { InactiveUser }
