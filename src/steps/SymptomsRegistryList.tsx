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
import withSession from 'src/hoc/WithSession'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { Role } from 'src/model/Role'

export type ViewRegistry = {
  day: number
  registries: RegistryDTO[]
}

export type MonthRegistry = {
  month: number
  year: number
  viewRegistries: ViewRegistry[]
}

type SymptomsRegistryListProp = {
  monthRegistries: MonthRegistry[] | null
}
const SymptomsRegistryList: FunctionComponent<SymptomsRegistryListProp> = ({
  monthRegistries,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!monthRegistries) {
      router.push(`/_error?error=${ErrorCodes.FAILED_SYMPTOMS_RETRIEVAL}`)
    }
  })
  if (!monthRegistries) {
    return null
  }

  return (
    <>
      <TitleHeader closeButton />
      <Text fontSize={['lg']} mt={2}>
        Historial de síntomas
      </Text>

      <Stack align="center" mt={2} spacing={3}>
        <Box>
          <SymptomsLegend />
        </Box>
        <Box width="100%" alignItems="center" alignContent="center">
          {monthRegistries?.length != 0 ? (
            monthRegistries?.map(({ month, year, viewRegistries }) => (
              <div key={month + year}>
                <Text fontSize={['lg']} textAlign="left" width="100%" mt={2}>
                  {formatMonth(month) + ', ' + year}
                </Text>
                {viewRegistries.map(({ day, registries }) => (
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

const toViewRegistries = (registries: RegistryDTO[]): MonthRegistry[] => {
  const viewRegistries: ViewRegistry[] = []
  let daysRegistry: RegistryDTO[] = []
  let firstIteration = true
  let symptomsDay = new Date()

  let symptomsGroupSaved = false

  if (registries.length === 0) {
    return []
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

  return toMonthRegistries(viewRegistries)
}

const toMonthRegistries = (viewRegistries: ViewRegistry[]) => {
  let firstIteration = true
  let symptomsYear = 0
  let symptomsMonth = 0
  const monthRegistries: MonthRegistry[] = []
  let oneMonthRegistry: ViewRegistry[] = []
  let monthGroupSaved = false

  viewRegistries.forEach((viewRegistry) => {
    monthGroupSaved = false
    const currentMonth = new Date(viewRegistry.day).getMonth()
    const currentYear = new Date(viewRegistry.day).getFullYear()
    if (firstIteration) {
      symptomsMonth = currentMonth
      symptomsYear = currentYear
      firstIteration = false
    }
    if (symptomsMonth === currentMonth) {
      oneMonthRegistry.push(viewRegistry)
    } else {
      monthRegistries.push({
        month: symptomsMonth,
        year: symptomsYear,
        viewRegistries: oneMonthRegistry,
      })
      oneMonthRegistry = []
      oneMonthRegistry.push(viewRegistry)
      symptomsMonth = currentMonth
      symptomsYear = currentYear
      monthGroupSaved = true
    }
  })

  if (
    monthRegistries.length != 0 &&
    (!monthGroupSaved || oneMonthRegistry.length === 1)
  ) {
    monthRegistries.push({
      month: symptomsMonth,
      year: symptomsYear,
      viewRegistries: oneMonthRegistry,
    })
  }
  if (monthRegistries.length === 0) {
    monthRegistries.push({
      month: symptomsMonth,
      year: symptomsYear,
      viewRegistries: oneMonthRegistry,
    })
  }
  return monthRegistries
}

const formatHourAndMinutes = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  const hour = formatTwoDigitNumber(date.getHours())
  const minute = formatTwoDigitNumber(date.getMinutes())
  const formattedHour = hour + ':' + minute
  return formattedHour
}

const formatDayAndNumberDate = (unformattedDate: number) => {
  const date = new Date(unformattedDate)
  const day = date.getDay()
  const numberDate = formatTwoDigitNumber(date.getDate())
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

const formatMonth = (unformattedMonth: number) => {
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
  const formattedMonth = monthValues[unformattedMonth]
  return formattedMonth
}

const formatTwoDigitNumber = (toFormatNumber: number): string => {
  return toFormatNumber < 10
    ? '0' + toFormatNumber.toString()
    : toFormatNumber.toString()
}

export const getServerSideProps: GetServerSideProps<SymptomsRegistryListProp> = async () => {
  let monthRegistries: MonthRegistry[] | null = null
  try {
    const registryService = new RegistryService()
    const symptomsRegistries = await registryService.registriesRetrieval()
    monthRegistries = toViewRegistries(symptomsRegistries)
  } catch (err) {
    console.error(err)
  }
  return { props: { monthRegistries } }
}

export default withSession(SymptomsRegistryList, [Role.CUIDADOR])
