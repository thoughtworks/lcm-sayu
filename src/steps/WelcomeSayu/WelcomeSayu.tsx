import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { signOut, useSession } from 'next-auth/client'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'

import ButtonLink from 'src/components/ButtonLink'
import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import { ErrorCodes } from 'src/components/Error'
import styles from './WelcomeSayu.module.scss'

const WelcomeSayu = () => {
  const [session, loading] = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!loading && session?.status === 'inactivo') {
      router.push(`/_error?error=${ErrorCodes.INACTIVE_USER}`)
      setTimeout(function () {
        signOut()
      }, 2000)
    }
  })

  return (
    <Flex direction="column">
      <header className={styles.header}>
        <div className={styles['logo-section']}>
          <img className={styles['heart-logo']} src="img/heart_logo.svg" />
          <img className={styles['sayu-logo']} src="img/sayu_logo.svg" />
        </div>
        <div className={styles['logout-button']}>
          <img
            src={(!loading && session && session.user.image) || ''}
            alt="Imagen de perfil"
          />
          <a
            href="api/auth/signout"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Salir
          </a>
        </div>
      </header>
      <Stack width="100%" marginTop={60} align="center">
        <Stack isInline>
          <Text fontWeight="bold" fontSize={['xl']}>
            Hola {!loading && session && session.user.name.split(' ')[0]}
          </Text>
          <Image src="img/waving_hand_emoji.svg" width="2em" />
        </Stack>

        <Text marginTop={5} fontSize={['sm']}>
          Utiliza esta herramienta para llevar un registro de los síntomas de tu
          hijo/hija.
        </Text>
        <Stack marginTop={70} />

        {Role.CUIDADOR === session?.role && (
          <div className={styles.actions}>
            <div>
              <ButtonLink
                href="/seleccion-nivel-dolor"
                label="Registrar síntomas"
              />
            </div>
            <div className={styles['symptom-registry-list-link']}>
              <ButtonLink
                href="/ver-registros-sintomas"
                label="Ver historial de síntomas"
                secondaryStyle
              />
            </div>
          </div>
        )}
        {Role.TRATANTE === session?.role && (
          <ButtonLink
            href="/tratante/gestion-usuario"
            label="Gestionar usuarios"
            secondaryStyle
          />
        )}
      </Stack>
    </Flex>
  )
}
export default withSession(WelcomeSayu, [Role.CUIDADOR, Role.TRATANTE])
