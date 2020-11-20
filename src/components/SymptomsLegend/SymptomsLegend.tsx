import styles from './symptomslegend.module.scss'
import React from 'react'
import { Stack, Box } from '@chakra-ui/core'

const SymptomsLegend = () => (
  <>
    <Stack isInline spacing={16}>
      <Stack>
        <Stack isInline>
          <Box>
            <div className={styles.dolor_legend} />
          </Box>
          <Box fontSize="xs">Dolor</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.cansancio_legend} />
          </Box>
          <Box fontSize="xs">Cansancio</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.apetito_legend} />
          </Box>
          <Box fontSize="xs">Apetito</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.nauseas_legend} />
          </Box>
          <Box fontSize="xs">Náuseas</Box>
        </Stack>
      </Stack>
      <Stack>
        <Stack isInline>
          <Box>
            <div className={styles.tragar_legend} />
          </Box>
          <Box fontSize="xs">Tragar</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.aire_legend} />
          </Box>
          <Box fontSize="xs">Falta de Aire</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.constipacion_legend} />
          </Box>
          <Box fontSize="xs">Constipación</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={styles.fiebre_legend} />
          </Box>
          <Box fontSize="xs">Fiebre</Box>
        </Stack>
      </Stack>
    </Stack>
  </>
)

export default SymptomsLegend
