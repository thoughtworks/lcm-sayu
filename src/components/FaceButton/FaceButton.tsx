import React from 'react'
import Link from 'next/link'

import styles from './FaceButton.module.scss'

const faceInfo = {
  faceZero: {
    img: 'img/faces/FaceZero.svg',
    number: '0',
    description: 'No duele',
    click: 0,
  },
  faceTwo: {
    img: 'img/faces/FaceTwo.svg',
    number: '2',
    description: 'Duele un poco',
    click: 2,
  },
  faceFour: {
    img: 'img/faces/FaceFour.svg',
    number: '4',
    description: 'Duele un poco más',
    click: 4,
  },
  faceSix: {
    img: 'img/faces/FaceSix.svg',
    number: '6',
    description: 'Duele mucho',
    click: 6,
  },
  faceEight: {
    img: 'img/faces/FaceEight.svg',
    number: '8',
    description: 'Duele mucho más',
    click: 8,
  },
  faceTen: {
    img: 'img/faces/FaceTen.svg',
    number: '10',
    description: 'Duele al máximo',
    click: 10,
  },
}

type FaceButtonProps = {
  painValue:
    | 'faceZero'
    | 'faceTwo'
    | 'faceFour'
    | 'faceSix'
    | 'faceEight'
    | 'faceTen'
}

const FaceButton = ({ painValue }: FaceButtonProps) => (
  <Link href={`/registro-sintomas?nivel-dolor=${faceInfo[painValue].click}`}>
    <a className={styles['face-button']}>
      <img
        className={styles['face-level']}
        src={faceInfo[painValue].img}
        alt={faceInfo[painValue].description}
      />
      <p className={styles['number']}>{faceInfo[painValue].number}</p>
      <p className={styles['description']}>{faceInfo[painValue].description}</p>
    </a>
  </Link>
)

export { FaceButton }
