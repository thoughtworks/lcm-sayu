import { FunctionComponent } from 'react'
import ButtonLink from 'src/components/ButtonLink'

import styles from './GenericSuccess.module.scss'

const GenericSuccess: FunctionComponent<{
  msg?: string
  labelBackButton?: string
  urlBackButton?: string
}> = ({ msg = '¡Todo ha salido bien! ✅', labelBackButton, urlBackButton }) => (
  <main id={styles.success}>
    <img src="/img/checkmark.svg" alt="éxito" width={122} height={122} />
    <p>{msg}</p>
    {urlBackButton && labelBackButton && (
      <ButtonLink href={urlBackButton} label={labelBackButton} />
    )}
    <ButtonLink
      href="/"
      label="Volver al inicio"
      secondaryStyle={urlBackButton && labelBackButton ? true : false}
    />
  </main>
)

export { GenericSuccess }
