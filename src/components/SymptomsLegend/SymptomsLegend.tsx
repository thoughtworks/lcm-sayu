import styles from './symptomslegend.module.scss'
import React from 'react'
import { Stack, Box } from '@chakra-ui/core'

const SymptomsLegend = () => (
  <>
    <Stack isInline spacing={16}>
      <Stack>
        <Stack isInline>
          <Box>
            <div className={`${styles['dolor-legend']} ${styles['legend']}`} />
          </Box>
          <Box fontSize="xs">Dolor</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div
              className={`${styles['cansancio-legend']} ${styles['legend']}`}
            />
          </Box>
          <Box fontSize="xs">Cansancio</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div
              className={`${styles['apetito-legend']} ${styles['legend']}`}
            />
          </Box>
          <Box fontSize="xs">Apetito</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div
              className={`${styles['nauseas-legend']} ${styles['legend']}`}
            />
          </Box>
          <Box fontSize="xs">Náuseas</Box>
        </Stack>
      </Stack>
      <Stack>
        <Stack isInline>
          <Box>
            <div className={`${styles['tragar-legend']} ${styles['legend']}`} />
          </Box>
          <Box fontSize="xs">Dificultad para tragar</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={`${styles['aire-legend']} ${styles['legend']}`} />
          </Box>
          <Box fontSize="xs">Falta de aire</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div
              className={`${styles['deposicion-legend']} ${styles['legend']}`}
            />
          </Box>
          <Box fontSize="xs">Deposiciones</Box>
        </Stack>
        <Stack isInline>
          <Box>
            <div className={`${styles['fiebre-legend']} ${styles['legend']}`} />
          </Box>
          <Box fontSize="xs">Fiebre</Box>
        </Stack>
      </Stack>
    </Stack>
  </>
)

export default SymptomsLegend
