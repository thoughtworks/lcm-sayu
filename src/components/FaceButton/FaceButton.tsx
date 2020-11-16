import React from 'react'
import { useRouter } from 'next/router'

import styles from './FaceButton.module.scss'

const faceInfo: { [key: string]: any } = {
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
  painValue: string
}

const FaceButton = ({ painValue }: FaceButtonProps) => {
  const router = useRouter()
  return (
    <section id={styles['face-button']}>
      <button
        onClick={() => {
          router.push({
            pathname: '/symptoms-registry',
            query: { 'pain-level': faceInfo[painValue].click },
          })
        }}
      >
        <img
          className={styles['face-level']}
          src={faceInfo[painValue].img}
          alt={faceInfo[painValue].description}
        />
      </button>
      <p className={styles['number']}>{faceInfo[painValue].number}</p>
      <p className={styles['description']}>{faceInfo[painValue].description}</p>
    </section>
  )
}
export { FaceButton }
