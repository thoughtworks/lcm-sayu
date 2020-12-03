import React, { FunctionComponent } from 'react'
import { Image, Flex, Text } from '@chakra-ui/core'
import styles from './PainBox.module.scss'

const painInformation: any = {
  '0': {
    name: 'No duele',
    icon: <Image src="img/faces/FaceZero.svg" />,
  },
  '2': {
    name: 'Duele un poco',
    icon: <Image src="img/faces/FaceTwo.svg" />,
  },
  '4': {
    name: 'Duele un poco más',
    icon: <Image src="img/faces/FaceFour.svg" />,
  },
  '6': {
    name: 'Duele mucho',
    icon: <Image src="img/faces/FaceSix.svg" />,
  },
  '8': {
    name: 'Duele mucho más',
    icon: <Image src="img/faces/FaceEight.svg" />,
  },
  '10': {
    name: 'Duele al máximo',
    icon: <Image src="img/faces/FaceTen.svg" />,
  },
}

type PainBoxProps = {
  painLevel: number | undefined
}

const PainBox: FunctionComponent<PainBoxProps> = ({ painLevel }) => (
  <>
    {painLevel !== undefined && (
      <div className={styles['box']}>
        <Flex direction="column" align="center">
          <Text>{painInformation[painLevel].icon}</Text>
          <Text>{painInformation[painLevel].name}</Text>
        </Flex>
      </div>
    )}
    {painLevel !== undefined && painLevel > 2 && (
      <p className={styles['hint']}>
        Se recomienda administrar rescate de analgesia
      </p>
    )}
  </>
)

export { PainBox }
