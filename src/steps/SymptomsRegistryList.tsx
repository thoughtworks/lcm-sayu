import React, { useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Text, Stack, Box } from '@chakra-ui/core'

import SymptomsLegend from 'src/components/SymptomsLegend/SymptomsLegend'
import SymptomsDailyValues from 'src/components/SymptomsDailyValues/SymptomsDailyValues'
import { DateBox } from 'src/components/DateBox/DateBox'
import { ErrorCodes } from 'src/components/Error'

import { RegistryDTO } from 'src/dto/RegistryDTO'
import { RegistryService } from 'src/services/RegistryService'
import { Navigation } from 'src/components/Navigation/Navigation'
import withSession from 'src/hoc/WithSession'

export type ViewRegistry = {
  day: number
  registries: RegistryDTO[]
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

  return (
    <>
      <Navigation />
      <Text fontSize={['lg']} mt={2}>
        Historial de síntomas
      </Text>

      <Stack align="center" mt={2} spacing={3}>
        <Box>
          <SymptomsLegend />
        </Box>
        <Text fontSize={['lg']} textAlign="left" width="100%">
          {viewRegistries?.length != 0
            ? formatMonthAndYear(viewRegistries?.slice(0, 1)[0].day)
            : ''}
        </Text>
        <Box width="100%" alignItems="center" alignContent="center">
          {viewRegistries?.length != 0 ? (
            viewRegistries?.map(({ day, registries }) => (
              <div key={day}>
                <DateBox symptomDate={formatDayAndNumberDate(day)} />
                {registries.map((registry) => (
                  <SymptomsDailyValues
                    key={registry.id}
                    symptomDate={formatHourAndMinutes(registry.symptomDate)}
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
        </Box>
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
        day: symptomsDay.getTime(),
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
      day: symptomsDay.getTime(),
      registries: daysRegistry,
    })
  }

  if (viewRegistries.length === 0) {
    viewRegistries.push({
      day: symptomsDay.getTime(),
      registries: daysRegistry,
    })
  }

  return viewRegistries
}

const formatHourAndMinutes = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const formattedHour = hour + ':' + minute
  return formattedHour
}

const formatDayAndNumberDate = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  const day = date.getDay()
  const numberDate = date.getDate()
  const dayValues = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const formattedDate = dayValues[day] + ',' + numberDate
  return formattedDate
}

const formatMonthAndYear = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  const month = date.getMonth()
  const year = date.getFullYear()
  const monthValues = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const formattedDate = monthValues[month] + ', ' + year
  return formattedDate
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

export default withSession(SymptomsRegistryList, 'tutor')
