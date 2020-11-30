import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, FormProvider } from 'react-hook-form'

import { SubmitButton } from 'src/components/SubmitButton'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import UserEmail from 'src/components/UserEmail'
import RoleRadioButton from 'src/components/RoleRadioButton'
import ButtonLink from 'src/components/ButtonLink'
import { SuccessCodes } from 'src/components/Success'
import { ErrorCodes } from 'src/components/Error'

import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'

import styles from './AddUser.module.scss'

const AddUser = () => {
  const methods = useForm({
    mode: 'onBlur',
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

            try {
              await axios.post('/api/user-save', userData)
              router.push(
                `/_success?key=${SuccessCodes.SUCCESSFUL_USER_REGISTRY}`
              )
            } catch (err) {
              router.push(`/_error?error=${ErrorCodes.USER_REGISTRY_ERROR}`)
            }
          })}
        >
          <div className={styles['user-email']}>
            <UserEmail autoFocus />
          </div>
          <div className={styles['roles']}>
            <RoleRadioButton />
          </div>
          <SubmitButton label="Guardar" />
          <div className={styles['cancel-link']}>
            <ButtonLink
              label="Cancelar"
              href="/tratante/gestion-usuario"
              secondaryStyle
            />
          </div>
        </form>
      </FormProvider>
    </main>
  )
}

export default withSession(AddUser, [Role.TRATANTE])
