import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, FormProvider } from 'react-hook-form'
import { SubmitButton } from 'src/components/SubmitButton'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import UserEmail from 'src/components/UserEmail'
import RoleRadioButton from 'src/components/RoleRadioButton'
import Link from 'src/components/Link'

import styles from './AddUser.module.scss'

const AddUser = () => {
  const methods = useForm({
    mode: 'onChange',
  })
  const router = useRouter()
  return (
    <main id={styles['add-user']}>
      <TitleHeader />
      <h1>Agregar usuario</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(async ({ userEmail, role }: any) => {
            const userData = {
              userEmail,
              role,
            }

            await axios.post('/api/registry-save', userData)
            router.push('/registro-exitoso-usuario')
          })}
        >
          <div className={styles['user-email']}>
            <UserEmail />
          </div>
          <div className={styles['roles']}>
            <RoleRadioButton />
          </div>
          <SubmitButton label="Guardar" />
          <div className={styles['cancel-link']}>
            <Link label="Cancelar" href="/" secondaryStyle />
          </div>
        </form>
      </FormProvider>
    </main>
  )
}

export default AddUser
