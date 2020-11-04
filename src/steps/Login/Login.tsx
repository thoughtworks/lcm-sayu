import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './login.module.scss'
const Login = () => {
  const [session, loading] = useSession()
  return (
    <main id={styles.login}>
      <header>
        <img
          src="img/heart_logo.svg"
          alt="logo corazon sayu"
          className={styles.heartLogo}
        />
        <span className={styles.sayuDescription}>
          sistema de ayuda al tutor
        </span>
        <img src="img/sayu_logo.svg" alt="sayu" className={styles.sayuLogo} />
      </header>
      <section>
        {!loading && !session ? (
          <a
            href="api/auth/signin"
            onClick={(e) => {
              e.preventDefault()
              signIn('google')
            }}
          >
            Login
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
        )}
      </section>
    </main>
  )
}
export default Login
