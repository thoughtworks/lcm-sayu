import React, { useState, useEffect } from 'react'
import { Text, Stack, Box } from '@chakra-ui/core'
import axios from 'axios'

import { default as SymptomsLegend } from '../components/SymptomsLegend/SymptomsLegend'
import { default as SymptomsDailyValues } from '../components/SymptomsDailyValues/SymptomsDailyValues'
import { RegistryDTO } from 'src/dto/RegistryDTO'

const SymptomsRegistryList = () => {
  useEffect(() => {
    getRegistries()
  }, [])

  const [registries, setRegistries] = useState<RegistryDTO[]>()

  async function getRegistries(): Promise<void> {
    try {
      const rs = await axios.get('/api/registry-read')
      setRegistries(rs.data)
      console.log('exito: ', rs.data)
      console.log('toViewRegistries: ', toViewRegistries(rs.data))
    } catch (err) {
      console.warn('error registros: ', err)
    }
  }

  type ViewRegistry = {
    day: string
    registries: RegistryDTO[]
  }
  //const bla = [{ day: 'Miercoles 07', registries: [] }]

  function toViewRegistries(registries: RegistryDTO[]): ViewRegistry[] {
    const viewRegistries: ViewRegistry[] = []
    let daysRegistry: RegistryDTO[] = []
    let firstIteration = true
    let symptomsDay = ''
    let symptomsGroupSaved = false

    registries.forEach((registry) => {
      symptomsGroupSaved = false
      const currentDay = registry.symptomDate
      if (firstIteration) {
        symptomsDay = currentDay
        firstIteration = false
      }

      if (currentDay === symptomsDay) {
        daysRegistry.push(registry)
      } else {
        viewRegistries.push({
          day: symptomsDay,
          registries: daysRegistry,
        })
        daysRegistry = []
        daysRegistry.push(registry)
        symptomsDay = currentDay
        symptomsGroupSaved = true
      }
    })

    if (!symptomsGroupSaved || daysRegistry.length === 1) {
      viewRegistries.push({
        day: symptomsDay,
        registries: daysRegistry,
      })
    }

    return viewRegistries
  }

  return (
    <>
      <Text fontSize={['lg']}>Historial de síntomas</Text>

      <Stack align="center" mt={2} spacing={3}>
        <Box>
          <SymptomsLegend />
        </Box>
        {registries?.map((registry) => (
          <Box key={registry.id}>
            <SymptomsDailyValues
              key={registry.id}
              symptomDate={registry.symptomDate}
              painLevel={registry.painLevel}
              tireLevel={registry.tireLevel}
              appetiteLevel={registry.appetiteLevel}
              nauseaLevel={registry.nauseaLevel}
              swallowLevel={registry.swallowLevel}
              airLevel={registry.airLevel}
              depositionLevel={registry.depositionLevel}
              feverLevel={registry.feverLevel}
            />
          </Box>
        ))}
      </Stack>
    </>
  )
}

export { SymptomsRegistryList }
