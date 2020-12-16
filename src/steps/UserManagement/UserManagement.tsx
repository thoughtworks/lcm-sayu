import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { Icon } from '@chakra-ui/core'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import { ErrorCodes } from 'src/components/Error'
import styles from './UserManagement.module.scss'
import { UserService } from 'src/services/UserService'
import { UserDTO } from 'src/dto/UserDTO'
import { Status } from 'src/model/Status'

type UsersProp = {
  users: UserDTO[] | undefined
}

const UserManagement: FunctionComponent<UsersProp> = ({ users }) => {
  const router = useRouter()

  useEffect(() => {
    if (users === undefined) {
      router.push(`/_error?error=${ErrorCodes.USER_LIST_ERROR}`)
    }
    if (users !== undefined && users.length === 0) {
      router.push('/tratante/agregar-usuario')
    }
  })
  if (users === undefined) {
    return null
  }

  return (
    <>
      <TitleHeader />
      <main id={styles['user-management']}>
        <header>
          <h1>Usuarios</h1>

          <Link href="/tratante/agregar-usuario">
            <a>
              <img src="/img/add_icon.svg" alt="agregar usuario" />
              Agregar usuario
            </a>
          </Link>
        </header>

        <table className={styles['user-list']}>
          <thead>
            <tr>
              <th>Estado</th>
              <th colSpan={2}>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>
                    <div
                      className={`${styles['user-status']} ${
                        user.status === Status.ACTIVO
                          ? styles['active']
                          : styles['inactive']
                      }`}
                    ></div>
                  </td>
                  <td>
                    <div>{user.email}</div>
                    <div className={styles['role']}>{user.role}</div>
                  </td>
                  <td>
                    <Link href={`/tratante/agregar-usuario?usuario=${user.id}`}>
                      <Icon name="chevron-right" size={'25px'} />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <div className={styles['bottom-row']} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<UsersProp> = async () => {
  let usersDTO: UserDTO[] | undefined = undefined
  try {
    const userService = new UserService()
    const users = await userService.getAll()
    usersDTO = users?.map((user) => ({
      id: user.id as number,
      email: user.email,
      role: user.role,
      status: user.status,
    }))
  } catch (err) {
    console.error(err)
  }
  return { props: { users: usersDTO } }
}

export default withSession(UserManagement, [Role.TRATANTE])
