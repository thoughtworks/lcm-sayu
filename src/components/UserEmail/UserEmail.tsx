import { FunctionComponent } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './UserEmail.module.scss'

const UserEmail: FunctionComponent = () => {
  const { register, errors } = useFormContext()
  return (
    <div className={styles['user-email']}>
      <label htmlFor="userEmail">Correo electrónico</label>
      <input
        id="userEmail"
        name="userEmail"
        type="email"
        ref={register({
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
        })}
      />
      {errors.userEmail && (
        <span className={styles.error}>
          Debes ingresar correo electrónico
          {errors.userEmail?.type === 'pattern' && ' válido'}
        </span>
      )}
    </div>
  )
}

export default UserEmail
