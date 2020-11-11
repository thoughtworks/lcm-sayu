import GoogleButton from 'src/components/GoogleButton'

import styles from './login.module.scss'
const Login = () => {
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
        <GoogleButton />
      </section>
    </main>
  )
}
export default Login
