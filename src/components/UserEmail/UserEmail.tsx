import { FunctionComponent, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import axios from 'axios'

import styles from './UserEmail.module.scss'

const UserEmail: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
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
      errorMsg = 'Debes ingresar un correo que no esté duplicado'
      break
  }

  const inputName = 'userEmail'
  const edit = props.readOnly ? true : false
  return (
    <div className={styles['user-email']}>
      <label htmlFor={inputName}>Correo electrónico</label>
      <input
        id={inputName}
        name={inputName}
        type="email"
        className={errors[inputName] && styles['invalid']}
        aria-invalid={!!errors[inputName]}
        {...props}
        ref={register({
          required: edit,
          pattern: validEmailPattern,
          validate: async (email: string) => {
            const {
              data: { emailAlreadyExist },
            } = await axios.post('/api/validate-email', { email })
            return !emailAlreadyExist
          },
        })}
      />
      {errorMsg && (
        <p role="alert" className={styles.error}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}

export const validEmailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/

export default UserEmail
