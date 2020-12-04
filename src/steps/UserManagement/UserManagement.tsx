import { Icon } from '@chakra-ui/core'
import Link from 'next/link'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import styles from './UserManagement.module.scss'

const UserManagement = () => (
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
          <tr>
            <td>
              <div
                className={`${styles['user-state']} ${styles['active']}`}
              ></div>
            </td>
            <td>
              <div>clopez@mail.com</div>
              <div className={styles['role']}>persona cuidadora</div>
            </td>
            <td>
              <Icon name="chevron-right" size={'25px'} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className={styles['bottom-row']} />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </>
)

export default withSession(UserManagement, [Role.TRATANTE])
