import { FunctionComponent } from 'react'
import Link from 'next/link'

import styles from './ButtonLink.module.scss'

type ButtonLinkProps = {
  href: string
  label: string
  secondaryStyle?: boolean
}

const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  href,
  label,
  secondaryStyle = false,
}) => (
  <Link href={href}>
    <a
      className={`${styles['button-link']} ${
        secondaryStyle ? styles.secondary : ''
      }`}
    >
      {label}
    </a>
  </Link>
)
export default ButtonLink
