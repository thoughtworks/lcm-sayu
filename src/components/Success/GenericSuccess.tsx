import { FunctionComponent } from 'react'
import ButtonLink from 'src/components/ButtonLink'

import styles from './GenericSuccess.module.scss'

const GenericSuccess: FunctionComponent<{
  msg?: string
  backUrl?: string
  backLabel?: string
}> = ({ msg = '¡Todo ha salido bien! ✅', backUrl, backLabel }) => (
  <main id={styles['success']}>
    <img src="/img/checkmark.svg" alt="éxito" width={122} height={122} />
    <p>{msg}</p>
    {backUrl && (
      <div className={styles.back}>
        <ButtonLink href={backUrl} label={`Volver a  ${backLabel}`} />
      </div>
    )}
    <ButtonLink href="/" label="Volver al inicio" secondaryStyle />
  </main>
)

export { GenericSuccess }
