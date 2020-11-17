import { FunctionComponent } from 'react'
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
  <a
    href={href}
    className={`${styles.link} ${secondaryStyle ? styles.secondary : ''}`}
  >
    {label}
  </a>
)
export default Link
