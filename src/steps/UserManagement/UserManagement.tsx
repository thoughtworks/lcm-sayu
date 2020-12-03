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
        <section>
          <div className={styles['user-list-title']}>Estado</div>
          <div className={styles['user-list-title']}>Usuario</div>
        </section>
      </header>
    </main>
  </>
)

export default withSession(UserManagement, [Role.TRATANTE])
