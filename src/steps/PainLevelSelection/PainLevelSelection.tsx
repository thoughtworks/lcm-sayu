import React from 'react'
import { Text } from '@chakra-ui/core'

import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { FaceButton } from 'src/components/FaceButton/FaceButton'
import withSession from 'src/high-order-function/WithSession'

import styles from './PainLevelSelection.module.scss'
import { Role } from 'src/model/Role'

const PainLevelSelection = () => {
  return (
    <main id={styles['pain-level-selection']}>
      <TitleHeader
        closeButton
        title="Cuéntale a sayu cómo te sientes hoy"
        subtitle="Registro de dolor"
      />

      <Text fontSize="sm" color="grey">
        Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige la
        cara que mejor describa cuánto te duele ahora"
      </Text>
      <div className={styles['pain-faces']}>
        <FaceButton painValue="faceZero" />
        <FaceButton painValue="faceTwo" />
        <FaceButton painValue="faceFour" />
        <FaceButton painValue="faceSix" />
        <FaceButton painValue="faceEight" />
        <FaceButton painValue="faceTen" />
      </div>
      <footer>
        <p>
          © 1983 Wong-Baker FACES Foundation. www.WongBakerFACES.org Used with
          permission.
        </p>
      </footer>
    </main>
  )
}

export default withSession(PainLevelSelection, [Role.CUIDADOR])
