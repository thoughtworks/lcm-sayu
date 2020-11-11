import styles from './symptomsDailyValues.module.scss'
import React from 'react'
import { Stack, Box, Text, Icon } from '@chakra-ui/core'

const SymptomsDailyValues = () => (
  <Box>
    <Box mb={1}>
      <div className={styles.dia}>Miércoles, 07</div>
    </Box>
    <Stack isInline spacing={1}>
      <Text fontSize={'xs'} ml={2} lineHeight={'tall'}>
        03:12
      </Text>
      <Box ml={1}>
        <div className={styles.dolor_value}>8</div>
      </Box>
      <Box>
        <div className={styles.cansancio_value}>10</div>
      </Box>
      <Box>
        <div className={styles.apetito_value}>1</div>
      </Box>
      <Box>
        <div className={styles.nauseas_value}>5</div>
      </Box>
      <Box>
        <div className={styles.tragar_value}>8</div>
      </Box>
      <Box>
        <div className={styles.aire_value}>9</div>
      </Box>
      <Box>
        <div className={styles.constipacion_value}>Sí</div>
      </Box>
      <Box>
        <div className={styles.fiebre_value}>No</div>
      </Box>
      <Icon name="edit" ml={3} mt={'2px'} />
    </Stack>
  </Box>
)

export default SymptomsDailyValues
