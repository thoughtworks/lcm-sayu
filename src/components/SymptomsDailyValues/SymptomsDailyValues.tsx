import styles from './symptomsDailyValues.module.scss'
import React from 'react'
import { Box, Text, Icon } from '@chakra-ui/core'

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
}: SymptomsLevel) => (
  <div className={styles['symptom-list']}>
    <Text fontSize={'xs'} ml={1} lineHeight={'tall'}>
      {symptomDate}
    </Text>
    <Box ml={1}>
      <div className={styles['dolor-value'] + ' ' + styles['symptom-circle']}>
        {painLevel}
      </div>
    </Box>
    <Box>
      <div
        className={styles['cansancio-value'] + ' ' + styles['symptom-circle']}
      >
        {tireLevel}
      </div>
    </Box>
    <Box>
      <div className={styles['apetito-value'] + ' ' + styles['symptom-circle']}>
        {appetiteLevel}
      </div>
    </Box>
    <Box>
      <div className={styles['nauseas-value'] + ' ' + styles['symptom-circle']}>
        {nauseaLevel}
      </div>
    </Box>
    <Box>
      <div className={styles['tragar-value'] + ' ' + styles['symptom-circle']}>
        {swallowLevel}
      </div>
    </Box>
    <Box>
      <div className={styles['aire-value'] + ' ' + styles['symptom-circle']}>
        {airLevel}
      </div>
    </Box>
    <Box>
      <div
        className={styles['deposicion-value'] + ' ' + styles['symptom-circle']}
      >
        {depositionLevel ? 'SI' : 'NO'}
      </div>
    </Box>
    <Box>
      <div className={styles['fiebre-value'] + ' ' + styles['symptom-circle']}>
        {feverLevel ? 'SI' : 'NO'}
      </div>
    </Box>
    <Icon name="delete" ml={1} mt={'3px'} />
  </div>
)

export default SymptomsDailyValues
