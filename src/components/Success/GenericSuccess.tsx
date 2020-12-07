import { FunctionComponent } from 'react'
import ButtonLink from 'src/components/ButtonLink'

import styles from './GenericSuccess.module.scss'

const GenericSuccess: FunctionComponent<{
  msg?: string
  msgButton?: string
  urlButton?: string
}> = ({ msg = '¡Todo ha salido bien! ✅', msgButton, urlButton }) => (
  <main id={styles.success}>
    <img src="/img/checkmark.svg" alt="éxito" width={122} height={122} />
    <p>{msg}</p>
    {urlButton && msgButton && (
      <ButtonLink href={urlButton} label={msgButton} />
    )}
    <ButtonLink
      href="/"
      label="Volver al inicio"
      secondaryStyle={urlButton && msgButton ? true : false}
    />
  </main>
)

export { GenericSuccess }
