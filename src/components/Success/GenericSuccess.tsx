import { FunctionComponent } from 'react'
import Link from 'src/components/Link'

import styles from './GenericSuccess.module.scss'

const GenericSuccess: FunctionComponent<{ msg?: string }> = ({
  msg = '¡Todo ha salido bien! ✅',
}) => (
  <main id={styles['success']}>
    <img src="/img/checkmark.svg" alt="éxito" width={122} height={122} />
    <p>{msg}</p>
    <Link href="/" label="Volver al inicio" />
  </main>
)

export { GenericSuccess }
