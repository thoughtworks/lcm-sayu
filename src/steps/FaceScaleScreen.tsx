import React from 'react'
import { Text, Stack, Box } from '@chakra-ui/core'
import { TitleHeader } from 'src/components/TitleHeader/TitleHeader'
import { FaceButton } from 'src/components/FaceButton/FaceButton'

const FaceScaleScreen = () => {
  return (
    <>
      <TitleHeader backArrowRoute="/" closeRoute="/" />
      <Box>
        <Text fontSize={['sm', 'md', 'md', 'lg']}>
          Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige
          la cara que mejor describa cuánto te duele ahora"
        </Text>
        <Stack isInline marginTop={20}>
          <FaceButton painValue="faceZero" />
          <FaceButton painValue="faceTwo" />
          <FaceButton painValue="faceFour" />
          <FaceButton painValue="faceSix" />
          <FaceButton painValue="faceEight" />
          <FaceButton painValue="faceTen" />
        </Stack>
      </Box>
    </>
  )
}

export { FaceScaleScreen }
