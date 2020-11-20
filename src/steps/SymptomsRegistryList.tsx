import React, { useState, useEffect } from 'react'
import { Text, Stack, Box } from '@chakra-ui/core'
import axios from 'axios'

import { default as SymptomsLegend } from '../components/SymptomsLegend/SymptomsLegend'
import { default as SymptomsDailyValues } from '../components/SymptomsDailyValues/SymptomsDailyValues'
import { DateBox } from '../components/DateBox/DateBox'

import { RegistryDTO } from 'src/dto/RegistryDTO'

const SymptomsRegistryList = () => {
  useEffect(() => {
    getRegistries()
  }, [])

  const [viewRegistries, setViewRegistries] = useState<ViewRegistry[]>()

  async function getRegistries(): Promise<void> {
    try {
      const rs = await axios.get('/api/registry-read')
      setViewRegistries(toViewRegistries(rs.data))
    } catch (err) {
      console.warn('error registros: ', err)
    }
  }

  type ViewRegistry = {
    day: string
    registries: RegistryDTO[]
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  }

  const monthName =
    viewRegistries?.length != 0
      ? viewRegistries?.slice(0, 1)[0].day.split(' ')[3]
      : ''
  const month = capitalize(monthName)
  const year =
    viewRegistries?.length != 0
      ? viewRegistries?.slice(0, 1)[0].day.split(' ')[5]
      : ''

  function toViewRegistries(registries: RegistryDTO[]): ViewRegistry[] {
    const viewRegistries: ViewRegistry[] = []
    let daysRegistry: RegistryDTO[] = []
    let firstIteration = true
    let symptomsDay = new Date()

    let symptomsGroupSaved = false

    registries.forEach((registry) => {
      symptomsGroupSaved = false
      const currentDay = new Date(registry.symptomDate)

      if (firstIteration) {
        symptomsDay = currentDay
        firstIteration = false
      }

      if (currentDay.getDate() === symptomsDay.getDate()) {
        daysRegistry.push(registry)
      } else {
        viewRegistries.push({
          day: symptomsDay.toLocaleDateString('es-CL', options),
          registries: daysRegistry,
        })
        daysRegistry = []
        daysRegistry.push(registry)
        symptomsDay = currentDay
        symptomsGroupSaved = true
      }
    })

    if (
      viewRegistries.length != 0 &&
      (!symptomsGroupSaved || daysRegistry.length === 1)
    ) {
      viewRegistries.push({
        day: symptomsDay.toLocaleDateString('es-CL', options),
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
        {viewRegistries?.length != 0 ? (
          <Text width={277} textAlign="left">
            {month + ', ' + year}
          </Text>
        ) : (
          ''
        )}
        {viewRegistries?.length != 0 ? (
          viewRegistries?.map(({ day, registries }) => (
            <div key={day}>
              <DateBox
                symptomDate={capitalize(day.split(' ')[0] + day.split(' ')[1])}
              />
              {registries.map((registry) => (
                <SymptomsDailyValues
                  key={registry.id}
                  symptomDate={new Date(registry.symptomDate)
                    .toLocaleTimeString('es-CL')
                    .slice(0, 5)}
                  painLevel={registry.painLevel}
                  tireLevel={registry.tireLevel}
                  appetiteLevel={registry.appetiteLevel}
                  nauseaLevel={registry.nauseaLevel}
                  swallowLevel={registry.swallowLevel}
                  airLevel={registry.airLevel}
                  depositionLevel={registry.depositionLevel}
                  feverLevel={registry.feverLevel}
                />
              ))}
            </div>
          ))
        ) : (
          <Text>Aún no tienes registros</Text>
        )}
      </Stack>
    </>
  )
}

function capitalize(word?: string): string {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : ''
}

export { SymptomsRegistryList }
