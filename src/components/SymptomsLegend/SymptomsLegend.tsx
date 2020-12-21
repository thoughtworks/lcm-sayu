import styles from './symptomslegend.module.scss'
import React from 'react'
import { Stack } from '@chakra-ui/core'

const SymptomsLegend = () => (
  <>
    <Stack isInline spacing={16}>
      <Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['dolor-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Dolor</p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['cansancio-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Cansancio</p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['apetito-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Apetito</p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['nauseas-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Náuseas</p>
        </Stack>
      </Stack>
      <Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['tragar-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>
            Dificultad para tragar
          </p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['aire-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Falta de aire</p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['deposicion-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Deposiciones</p>
        </Stack>
        <Stack isInline>
          <div>
            <div
              className={`${styles['fiebre-legend']} ${styles['bullet-legend']}`}
            />
          </div>
          <p className={styles['symptom-legend-text']}>Fiebre</p>
        </Stack>
        <Stack isInline>
          <div className={styles['rescue-legend']}>
            <p>Rescate de analgesia</p>
          </div>
        </Stack>
      </Stack>
    </Stack>
  </>
)

export default SymptomsLegend
