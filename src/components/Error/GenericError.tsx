import { FunctionComponent } from 'react'
import ButtonLink from 'src/components/ButtonLink'

import styles from './GenericError.module.scss'

const GenericError: FunctionComponent<{
  msg?: string
  retryUrl?: string
  retryLabel?: string
}> = ({
  msg = 'Ha ocurrido un error ❌.',
  retryLabel = 'Volver a intentarlo',
  retryUrl,
}) => (
  <main className={styles['error']}>
    <img src="/img/failed_login.svg" />
    <p>{msg}</p>

    {retryUrl && (
      <div className={styles['retry']}>
        <ButtonLink href={retryUrl} label={retryLabel} />
      </div>
    )}

    <ButtonLink href="/" label="Salir" secondaryStyle={!!retryUrl} />
  </main>
)
export { GenericError }
