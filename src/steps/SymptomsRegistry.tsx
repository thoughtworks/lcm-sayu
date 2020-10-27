import React from 'react'
import { Text, Stack, Box } from '@chakra-ui/core'
import { Slider } from 'src/components/SymptomSlider/SymptomSlider'
import { PainBox } from 'src/components/PainBox/PainBox'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { useRouter } from 'next/router'

const SymptomsRegistry = () => {
  const router = useRouter()
  const painLevel = router.query['pain-level'] as string
  return (
    <>
      <TitleHeader backArrowRoute="/face-scale-screen" closeRoute="/" />
      <PainBox painLevel={painLevel} />

      <Text fontSize="md" mb="8" mt="8">
        ¿Tienes otros síntomas? <br /> Regístralos considerando que 0 es
        ausencia del síntoma y 10 es la mayor intensidad de este.
      </Text>

      <Stack spacing={10}>
        <Box>
          <Slider symptomValue="Cansancio" />
        </Box>
        <Box>
          <Slider symptomValue="Náusea" />
        </Box>
        <Box>
          <Slider symptomValue="Depresión" />
        </Box>
        <Box>
          <Slider symptomValue="Ansiedad" />
        </Box>
        <Box>
          <Slider symptomValue="Somnolencia" />
        </Box>
        <Box>
          <Slider symptomValue="Apetito" />
        </Box>
        <Box>
          <Slider symptomValue="Bienestar/Malestar" />
        </Box>
        <Box>
          <Slider symptomValue="Falta de aire" />
        </Box>
        <Box>
          <Slider symptomValue="Dificultad para dormir" />
        </Box>
      </Stack>
    </>
  )
}
export { SymptomsRegistry }
