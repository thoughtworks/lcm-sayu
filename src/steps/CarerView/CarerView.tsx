import { FunctionComponent, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import { Carer } from 'src/model/Carer'
import { UserService } from 'src/services/UserService'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import styles from './CarerView.module.scss'

const CarerView: FunctionComponent<{ carerList: Carer[] }> = ({
  carerList,
}) => {
  const router = useRouter()
  useEffect(() => {
    if (carerList.length === 0) {
      router.push('/tratante/agregar-usuario')
    }
  })

  return (
    <main id={styles['carer-view']}>
      <header>
        <TitleHeader />
        <h1>Cuidadores</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {carerList
            .sort(
              (currentCarer, nextCarer) =>
                (nextCarer.lastUpdated || 0) - (currentCarer.lastUpdated || 0)
            )
            .map(({ id, name, lastUpdated }) => (
              <tr key={id}>
                <td className={styles['user-information']}>
                  <span className={styles['user-name']}>{name}</span>
                  <span className={styles['last-updated']}>
                    {(lastUpdated &&
                      `Última actualización: ${formatLastUpdated(
                        lastUpdated
                      )}`) ||
                      'Sin registro'}
                  </span>
                </td>
                <td>
                  {lastUpdated && (
                    <Link href={`/ver-registros-sintomas?cuidador=${id}`}>
                      <a>
                        <img
                          alt={`Ver registros de ${name}`}
                          src="/img/right_arrow.png"
                        />
                      </a>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  )
}

const formatLastUpdated = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  return `${addZeroToOneDigitNumber(date.getDate())}/${addZeroToOneDigitNumber(
    date.getMonth() + 1
  )}/${date.getFullYear()}`
}
const addZeroToOneDigitNumber = (number: number) => {
  let leadingChar = ''
  if (number < 10) {
    leadingChar = '0'
  }
  return `${leadingChar}${number}`
}

export const getServerSideProps: GetServerSideProps<{
  carerList: Carer[]
}> = async () => {
  let carerList: Carer[] = []
  try {
    const userService = new UserService()
    carerList = await userService.getCarers()
  } catch (err) {
    console.error(err)
  }
  return { props: { carerList } }
}

export default withSession(CarerView, [Role.TRATANTE])
