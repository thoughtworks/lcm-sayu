import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useForm, FormProvider } from 'react-hook-form'

import { SubmitButton } from 'src/components/SubmitButton'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import UserEmail from 'src/components/UserEmail'
import RoleRadioButton from 'src/components/RoleRadioButton'
import UserStatusRadioButton from 'src/components/UserStatusRadioButton'
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
  user: UserDTO | null
  error: boolean
}
const AddUser: FunctionComponent<UserProp> = ({ user, error }) => {
  const methods = useForm({
    mode: 'onBlur',
  })

  const router = useRouter()
  const addUserMode = user ? 'Editar' : 'Agregar'
  const readOnly = user ? true : false

  useEffect(() => {
    if (error) {
      router.push(`/_error?error=${ErrorCodes.USER_EDIT_ERROR}`)
    }
  })

  if (error) {
    return null
  }

  return (
    <main id={styles['add-user']}>
      <TitleHeader />
      <h1>{addUserMode} usuario</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            async ({ userEmail, role, status }: any) => {
              const userData = {
                userEmail,
                role,
                status,
              }

              try {
                await axios.post('/api/user-save', userData)
                router.push(
                  `/_success?key=${SuccessCodes.SUCCESSFUL_USER_REGISTRY}`
                )
              } catch (err) {
                router.push(`/_error?error=${ErrorCodes.USER_REGISTRY_ERROR}`)
              }
            }
          )}
        >
          <div className={styles['user-email']}>
            <UserEmail
              autoFocus
              defaultValue={user?.email}
              readOnly={readOnly}
            />
          </div>
          <div className={styles.roles}>
            <RoleRadioButton selectedRole={user?.role as string} />
          </div>
          <div className={styles.status}>
            <UserStatusRadioButton selectedStatus={user?.status} />
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
  query,
}) => {
  let userDTO: UserDTO | null = null
  let error = false
  try {
    const userId = parseInt(query['usuario'] as string)

    if (!isNaN(userId)) {
      const userService = new UserService()
      const user = (await userService.getUserById(userId)) || null

      if (!user) {
        throw new Error(`User not found: ${userId}`)
      }

      userDTO = {
        id: user.id as number,
        email: user.email,
        role: user.role,
        status: user.status,
      }
    }
  } catch (err) {
    error = true
    console.error(err)
  }
  return { props: { user: userDTO, error } }
}
export default withSession(AddUser, [Role.TRATANTE])
