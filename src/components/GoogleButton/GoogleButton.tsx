import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './GoogleButton.module.scss'
const GoogleButton = () => {
  const [session, loading] = useSession()
  return !loading && !session ? (
    <a
      id={styles['google-button']}
      href="api/auth/signin"
      onClick={(e) => {
        e.preventDefault()
        signIn('google')
      }}
    >
      <div className={styles['g-logo']}>
        <img src="img/g_logo.svg" />
      </div>
      <div className={styles.text}>Iniciar sesión con Google</div>
    </a>
  ) : (
    <a
      href="api/auth/signout"
      onClick={(e) => {
        e.preventDefault()
        signOut()
      }}
    >
      Logout
    </a>
  )
}
export default GoogleButton
