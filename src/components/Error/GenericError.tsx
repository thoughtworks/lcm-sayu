import { FunctionComponent } from 'react'
import Link from 'src/components/Link'

import styles from './GenericError.module.scss'

const GenericError: FunctionComponent<{ msg?: string; retryUrl?: string }> = ({
  msg = 'Ha ocurrido un error ❌.',
  retryUrl,
}) => (
  <main className={styles['error']}>
    <img src="/img/failed_login.svg" />
    <p>{msg}</p>

    {retryUrl && (
      <div className={styles['retry']}>
        <Link href={retryUrl} label="Volver a intentarlo" />{' '}
      </div>
    )}

    <Link href="/" label="Salir" secondaryStyle={!!retryUrl} />
  </main>
)
export { GenericError }
