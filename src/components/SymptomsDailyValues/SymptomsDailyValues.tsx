import React from 'react'
import { Box, Icon, Text } from '@chakra-ui/core'
import { useSession } from 'next-auth/client'

import { Role } from 'src/model/Role'

import styles from './symptomsDailyValues.module.scss'

type SymptomsLevel = {
  symptomDate: string
  painLevel: number
  tireLevel: number
  appetiteLevel: number
  nauseaLevel: number
  swallowLevel: number
  airLevel: number
  depositionLevel: boolean
  feverLevel: boolean
  rescueLevel: boolean
}

const SymptomsDailyValues = ({
  symptomDate,
  painLevel,
  tireLevel,
  appetiteLevel,
  nauseaLevel,
  swallowLevel,
  airLevel,
  depositionLevel,
  feverLevel,
  rescueLevel,
}: SymptomsLevel) => {
  const [session] = useSession()

  return (
    <div
      className={`${styles['symptom-list']} ${
        rescueLevel && styles['with-rescue']
      }`}
    >
      <Text fontSize={'xs'} ml={1} lineHeight={'tall'}>
        {symptomDate}
      </Text>
      <Box ml={1}>
        <div className={`${styles['dolor-value']} ${styles['symptom-circle']}`}>
          {painLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['cansancio-value']} ${styles['symptom-circle']}`}
        >
          {tireLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['apetito-value']} ${styles['symptom-circle']}`}
        >
          {appetiteLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['nauseas-value']} ${styles['symptom-circle']}`}
        >
          {nauseaLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['tragar-value']} ${styles['symptom-circle']}`}
        >
          {swallowLevel}
        </div>
      </Box>
      <Box>
        <div className={`${styles['aire-value']} ${styles['symptom-circle']}`}>
          {airLevel}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['deposicion-value']} ${styles['symptom-circle']}`}
        >
          {depositionLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      <Box>
        <div
          className={`${styles['fiebre-value']} ${styles['symptom-circle']}`}
        >
          {feverLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      {session?.role === Role.CUIDADOR && (
        <Box>
          <div>
            <Icon name="delete" />
          </div>
        </Box>
      )}
    </div>
  )
}

export default SymptomsDailyValues
