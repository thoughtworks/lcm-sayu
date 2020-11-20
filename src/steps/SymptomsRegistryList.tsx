import React from 'react'
// import { NextRouter, useRouter } from 'next/router'
import { Text, Stack, Box } from '@chakra-ui/core'
// import { useForm } from 'react-hook-form'
// import axios from 'axios'
import CSS from 'csstype'

import { default as SymptomsLegend } from '../components/SymptomsLegend/SymptomsLegend'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

const SymptomsRegistryList = () => {
  const dolorValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#00AFA2',
  }
  const cansancioValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#616EE4',
  }
  const apetitoValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#FFCA2A',
  }
  const nauseasValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#163EB3',
  }
  const tragarValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#E63E6C',
  }
  const aireValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#B3CF71',
  }
  const constipacionValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#EE7342',
  }
  const fiebreValor: CSS.Properties = {
    width: '21px',
    height: '21px',
    lineHeight: '20px',
    borderRadius: '50%',
    fontSize: '10px',
    color: '#fff',
    textAlign: 'center',
    background: '#168DB3',
  }

  return (
    <>
      <TitleHeader />

      <Text fontSize={['lg']}>Historial de síntomas</Text>

      <Stack width="100%" align="center" mt={2}>
        <SymptomsLegend />
        <Text fontSize={['sm']} marginTop={20}>
          Valores
        </Text>
        <Stack isInline spacing={1}>
          <Box>
            <div style={dolorValor}>8</div>
          </Box>
          <Box>
            <div style={cansancioValor}>8</div>
          </Box>
          <Box>
            <div style={apetitoValor}>8</div>
          </Box>
          <Box>
            <div style={nauseasValor}>8</div>
          </Box>
          <Box>
            <div style={tragarValor}>8</div>
          </Box>
          <Box>
            <div style={aireValor}>8</div>
          </Box>
          <Box>
            <div style={constipacionValor}>8</div>
          </Box>
          <Box>
            <div style={fiebreValor}>8</div>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export { SymptomsRegistryList }
