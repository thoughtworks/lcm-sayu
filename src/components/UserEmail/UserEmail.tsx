import { FunctionComponent } from 'react'
import { useFormContext } from 'react-hook-form'
import axios from 'axios'

import styles from './UserEmail.module.scss'

const UserEmail: FunctionComponent = () => {
  const { register, errors } = useFormContext()

  let errorMsg = ''
  switch (errors.userEmail?.type) {
    case 'required':
      errorMsg = 'Debes ingresar correo electrónico'
      break
    case 'pattern':
      errorMsg = 'Debes ingresar correo electrónico válido'
      break
    case 'validate':
      errorMsg = 'Correo ya existe'
      break
  }

  return (
    <div className={styles['user-email']}>
      <label htmlFor="userEmail">Correo electrónico</label>
      <input
        id="userEmail"
        name="userEmail"
        type="email"
        className={errors.userEmail && styles['invalid']}
        ref={register({
          required: true,
          pattern: validEmailPattern,
          validate: async (email: string) => {
            const {
              data: { emailAlreadyExist },
            } = await axios.post('/api/validate-email', { email })
            return !emailAlreadyExist
          },
        })}
      />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </div>
  )
}

export const validEmailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

export default UserEmail
