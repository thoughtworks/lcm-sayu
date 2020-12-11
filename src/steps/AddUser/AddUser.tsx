import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, FormProvider } from 'react-hook-form'

import { SubmitButton } from 'src/components/SubmitButton'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import UserEmail from 'src/components/UserEmail'
import RoleRadioButton from 'src/components/RoleRadioButton'
import UserStateRadioButton from 'src/components/UserStateRadioButton'
import ButtonLink from 'src/components/ButtonLink'
import { SuccessCodes } from 'src/components/Success'
import { ErrorCodes } from 'src/components/Error'

import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'

import styles from './AddUser.module.scss'
import { GetServerSideProps } from 'next'
import { UserDTO } from 'src/dto/UserDTO'
import { UserService } from 'src/services/UserService'

type UserProp = {
  user: UserDTO | undefined | null
}
const AddUser: FunctionComponent<UserProp> = ({ user }) => {
  const methods = useForm({
    mode: 'onBlur',
  })

  const router = useRouter()

  const addUserMode = user ? 'Editar' : 'Agregar'
  const readOnly = user ? true : false
  return (
    <main id={styles['add-user']}>
      <TitleHeader />
      <h1>{addUserMode} usuario</h1>
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
            <UserEmail
              autoFocus
              defaultValue={user?.email}
              readOnly={readOnly}
            />
          </div>
          <div className={styles['roles']}>
            <RoleRadioButton selectedRole={user?.role as string} />
          </div>
          <div>
            <UserStateRadioButton />
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
export const getServerSideProps: GetServerSideProps<UserProp> = async ({
  req,
  query,
}) => {
  let user: UserDTO | undefined | null = null
  try {
    const userId = parseInt(query['usuario'] as string)
    if (userId) {
      const userService = new UserService()
      user = await userService.getById(userId)
    }

    user = user === undefined ? null : user
  } catch (err) {
    console.error(err)
  }
  return { props: { user } }
}
export default withSession(AddUser, [Role.TRATANTE])
