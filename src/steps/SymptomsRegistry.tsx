import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Text, Stack, Box } from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { SymptomSlider } from 'src/components/SymptomSlider/SymptomSlider'
import { PainBox } from 'src/components/PainBox/PainBox'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { SubmitButton } from 'src/components/SubmitButton'
import { SymptomRadioButton } from 'src/components/SymptomRadioButton/SymptomRadioButton'
import ButtonLink from 'src/components/ButtonLink'
import { ErrorCodes } from 'src/components/Error'

import withSession from 'src/hoc/WithSession'
import { Role } from 'src/model/Role'
import { SuccessCodes } from 'src/components/Success'

function SymptomsRegistry() {
  const router = useRouter()
  const painLevel = parseInt(router.query['nivel-dolor'] as string, 10)
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
        <Text fontSize="md" mb="8" mt="8">
          ¿Tienes otros síntomas? <br /> Regístralos considerando que 0 es
          ausencia del síntoma y 10 es la mayor intensidad de este.
        </Text>

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
            <SymptomRadioButton symptomValue="Constipación" control={control} />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Fiebre" control={control} />
          </Box>
          <Box>
            <SymptomRadioButton symptomValue="Rescate" control={control} />
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
const onSubmit = (painLevel: number, router: NextRouter) => async (
  data: any
) => {
  const request = {
    painlevel: painLevel,
    rescate: parseInt(data['Rescate'], 10) as number,
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
