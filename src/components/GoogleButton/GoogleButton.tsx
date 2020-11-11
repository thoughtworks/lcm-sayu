import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './GoogleButton.module.scss'
const GoogleButton = () => {
  const [session, loading] = useSession()
  return !loading && !session ? (
    <a
      href="api/auth/signin"
      onClick={(e) => {
        e.preventDefault()
        signIn('google')
      }}
    >
      <button id={styles['google-button']}>
        <div className={styles['g-logo']}>
          <img src="img/g_logo.svg" />
        </div>
        <div className={styles.text}>Iniciar sesión con Google</div>
      </button>
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
