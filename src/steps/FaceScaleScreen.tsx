import React from 'react'
import { Text, Stack } from '@chakra-ui/core'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { FaceButton } from 'src/components/FaceButton/FaceButton'

const FaceScaleScreen = () => {
  return (
    <>
      <TitleHeader backArrowRoute="/" closeRoute="/" />

      <Text fontSize={['sm']}>
        Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige la
        cara que mejor describa cuánto te duele ahora"
      </Text>
      <Stack marginTop={20} width="100%" align="center">
        <Text fontWeight="bold" fontSize={['sm']} marginBottom={5}>
          Wong-Baker FACES® Pain Rating Scale
        </Text>
      </Stack>
      <Stack isInline width="100%" justifyContent="center">
        <FaceButton painValue="faceZero" />
        <FaceButton painValue="faceTwo" />
        <FaceButton painValue="faceFour" />
        <FaceButton painValue="faceSix" />
        <FaceButton painValue="faceEight" />
        <FaceButton painValue="faceTen" />
      </Stack>
      <Stack width="100%" align="center">
        <Text fontSize={['sm']} marginTop={20}>
          © 1983 Wong-Baker FACES Foundation. www.WongBakerFACES.org Used with
          permission.
        </Text>
      </Stack>
    </>
  )
}

export { FaceScaleScreen }
