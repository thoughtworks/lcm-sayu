import React from 'react'
// import { NextRouter, useRouter } from 'next/router'
import { Text, Stack, Box } from '@chakra-ui/core'
// import { useForm } from 'react-hook-form'
import axios from 'axios'

import { default as SymptomsLegend } from '../components/SymptomsLegend/SymptomsLegend'
import { default as SymptomsDailyValues } from '../components/SymptomsDailyValues/SymptomsDailyValues'

const SymptomsRegistryList = () => {
  return (
    <>
      <Text fontSize={['lg']}>Historial de síntomas</Text>

      <Stack align="center" mt={2} spacing={3}>
        <Box>
          <SymptomsLegend />
        </Box>
        <Box>
          <SymptomsDailyValues />
        </Box>
      </Stack>
      <input type="button" onClick={onClick()} value="Click Me!" />
    </>
  )
}

const onClick = () => async () => {
  const request = {
    date: new Date(),
  }
  try {
    await axios.post('/api/registry-read', request)
    // console.log('exito: ', rs.data)
  } catch (err) {
    // console.log('error registros: ', err)
  }
}

export { SymptomsRegistryList }
