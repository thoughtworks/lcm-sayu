import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Stack, Box } from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { SymptomSlider } from 'src/components/SymptomSlider/SymptomSlider'
import { PainBox } from 'src/components/PainBox/PainBox'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { SubmitButton } from 'src/components/SubmitButton'
import { SymptomRadioButton } from 'src/components/SymptomRadioButton/SymptomRadioButton'
import ButtonLink from 'src/components/ButtonLink'
import { ErrorCodes } from 'src/components/Error'
import { SuccessCodes } from 'src/components/Success'

import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'

import styles from './SymptomsRegistry.module.scss'

function SymptomsRegistry() {
  const router = useRouter()
  let painLevel
  if (router.query['nivel-dolor'] || router.query['nivel-dolor'] === '0') {
    painLevel = parseInt(router.query['nivel-dolor'] as string, 10)
    painLevel = isNaN(painLevel) ? undefined : painLevel
  }

  const { handleSubmit, control } = useForm()
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit(painLevel, router))}>
        <TitleHeader
          closeButton
          title="Cuéntale a sayu cómo te sientes hoy"
          subtitle="Registro de dolor"
        />

        <PainBox painLevel={painLevel} />

        <div className={styles['instructions']}>
          <p>¿Tienes otros síntomas?</p>
          <p>
            Regístralos considerando que 0 es ausencia del síntoma y 10 es la
            mayor intensidad de este.
          </p>
        </div>

        <Stack spacing={10}>
          <Box>
            <SymptomSlider symptomValue="Cansancio" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Náusea" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Apetito" control={control} />
          </Box>
          <Box>
            <SymptomSlider symptomValue="Falta de aire" control={control} />
          </Box>
          <Box>
            <SymptomSlider
              symptomValue="Dificultad para tragar"
              control={control}
            />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Deposiciones" control={control} />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Fiebre" control={control} />
          </Box>
        </Stack>

        <Stack marginTop={8} width="100%" align="center">
          <SubmitButton label="Registrar" />
        </Stack>
        <Stack marginTop={2} width="100%" align="center">
          <ButtonLink href="/" label="Cancelar" secondaryStyle />
        </Stack>
      </form>
    </>
  )
}
const onSubmit = (painLevel: number | undefined, router: NextRouter) => async (
  data: any
) => {
  const request = {
    painlevel: painLevel,
    fiebre: parseInt(data['Fiebre'], 10) as number,
    constipacion: parseInt(data['Constipación'], 10) as number,
    cansancio: data['Cansancio'],
    nausea: data['Náusea'],
    apetito: data['Apetito'],
    aire: data['Falta de aire'],
    tragar: data['Dificultad para tragar'],
  }
  try {
    await axios.post('/api/registry-save', request)
    router.push(`/_success?key=${SuccessCodes.SUCCESSFUL_SYMPTOM_REGISTRY}`)
  } catch (err) {
    router.push(`/_error?error=${ErrorCodes.FAILED_SYMPTOMS_REGISTRY}`)
  }
}
export default withSession(SymptomsRegistry, [Role.CUIDADOR])
