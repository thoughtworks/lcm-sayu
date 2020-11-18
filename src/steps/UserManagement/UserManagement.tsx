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

        <a href="/tratante/agregar-usuario">
          <img src="/img/add_icon.svg" alt="agregar usuario" />
          Agregar usuario
        </a>
      </header>
    </main>
  </>
)

export default withSession(UserManagement, [Role.TRATANTE])
