import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Text, Stack, Box } from '@chakra-ui/core'

import SymptomsLegend from 'src/components/SymptomsLegend/SymptomsLegend'
import SymptomsDailyValues from 'src/components/SymptomsDailyValues/SymptomsDailyValues'
import { DateBox } from 'src/components/DateBox/DateBox'
import { ErrorCodes } from 'src/components/Error'

import { RegistryDTO } from 'src/dto/RegistryDTO'
import 'intl'
import 'intl/locale-data/jsonp/es'

import { RegistryService } from 'src/services/RegistryService'
global.Intl = require('intl')

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

type SymptomsRegistryListProp = {
  viewRegistries: ViewRegistry[] | null
}
const SymptomsRegistryList: FunctionComponent<SymptomsRegistryListProp> = ({
  viewRegistries,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!viewRegistries) {
      router.push(`/_error?error=${ErrorCodes.FailedSymptomsRetrieval}`)
    }
  })
  if (!viewRegistries) {
    return null
  }

  const capitalize = (word?: string): string => {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : ''
  }

  let monthInfo = ''
  if (viewRegistries?.length != 0) {
    monthInfo =
      capitalize(viewRegistries?.slice(0, 1)[0].day.split(' ')[3]) +
      ', ' +
      viewRegistries?.slice(0, 1)[0].day.split(' ')[5]
  }

  return (
    <>
      <Text fontSize={['lg']}>Historial de síntomas</Text>

      <Stack align="center" mt={2} spacing={3}>
        <Box>
          <SymptomsLegend />
        </Box>
        <Text fontSize={['lg']} width={277} textAlign="left">
          {monthInfo}
        </Text>
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

const toViewRegistries = (registries: RegistryDTO[]): ViewRegistry[] => {
  const viewRegistries: ViewRegistry[] = []
  let daysRegistry: RegistryDTO[] = []
  let firstIteration = true
  let symptomsDay = new Date()

  let symptomsGroupSaved = false

  if (registries.length === 0) {
    return viewRegistries
  }

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
        day: new Intl.DateTimeFormat('es-CL', options).format(symptomsDay),
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
      day: new Intl.DateTimeFormat('es-CL', options).format(symptomsDay),
      registries: daysRegistry,
    })
  }

  if (viewRegistries.length === 0) {
    viewRegistries.push({
      day: new Intl.DateTimeFormat('es-CL', options).format(symptomsDay),
      registries: daysRegistry,
    })
  }

  return viewRegistries
}

export const getServerSideProps: GetServerSideProps<SymptomsRegistryListProp> = async () => {
  let viewRegistries: ViewRegistry[] | null = null
  try {
    const registryService = new RegistryService()
    const symptomsRegistries = await registryService.registriesRetrieval()
    viewRegistries = toViewRegistries(symptomsRegistries)
  } catch (err) {
    console.error(err)
  }
  return { props: { viewRegistries } }
}

export { SymptomsRegistryList }
