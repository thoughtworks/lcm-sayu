import styles from './GoogleButton.module.scss'
const GoogleButton = () => {
  return (
    <button id={styles['google-button']}>
      <div className={styles['g-logo']}>
        <img src="img/g_logo.svg" />
      </div>
      <div className={styles.text}>Iniciar sesión con Google</div>
    </button>
  )
}
export default GoogleButton
