import { FunctionComponent } from 'react'
import NextLink from 'next/link'

import styles from './Link.module.scss'

type LinkProps = {
  href: string
  label: string
  secondaryStyle?: boolean
}

const Link: FunctionComponent<LinkProps> = ({
  href,
  label,
  secondaryStyle = false,
}) => (
  <NextLink href={href}>
    <a className={`${styles.link} ${secondaryStyle ? styles.secondary : ''}`}>
      {label}
    </a>
  </NextLink>
)
export default Link
