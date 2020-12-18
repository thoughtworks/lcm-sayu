import styles from './dateBox.module.scss'
import React from 'react'
import { Box } from '@chakra-ui/react'

type DateBoxProps = {
  symptomDate: string
}

const DateBox = ({ symptomDate }: DateBoxProps) => (
  <Box>
    <div className={styles.dia}>{symptomDate}</div>
  </Box>
)

export { DateBox }
