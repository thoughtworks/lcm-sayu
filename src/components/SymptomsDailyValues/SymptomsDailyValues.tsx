import styles from './symptomsDailyValues.module.scss'
import React from 'react'
import { Stack, Box, Text, Icon } from '@chakra-ui/core'

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
  <Box>
    <Stack isInline spacing={1}>
      <Text fontSize={'xs'} ml={2} lineHeight={'tall'}>
        {symptomDate}
      </Text>
      <Box ml={1}>
        <div className={styles.dolor_value}>{painLevel}</div>
      </Box>
      <Box>
        <div className={styles.cansancio_value}>{tireLevel}</div>
      </Box>
      <Box>
        <div className={styles.apetito_value}>{appetiteLevel}</div>
      </Box>
      <Box>
        <div className={styles.nauseas_value}>{nauseaLevel}</div>
      </Box>
      <Box>
        <div className={styles.tragar_value}>{swallowLevel}</div>
      </Box>
      <Box>
        <div className={styles.aire_value}>{airLevel}</div>
      </Box>
      <Box>
        <div className={styles.deposicion_value}>
          {depositionLevel ? 'SI' : 'NO'}
        </div>
      </Box>
      <Box>
        <div className={styles.fiebre_value}>{feverLevel ? 'SI' : 'NO'}</div>
      </Box>
      <Icon name="delete" ml={3} mt={'3px'} />
    </Stack>
  </Box>
)

export default SymptomsDailyValues
