import React from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'

const TitleHeader = () => {
  const router = useRouter()
  return (
    <Box marginTop={5}>
      <Flex justify="space-between">
        <button type="button" onClick={() => router.back()}>
          <Image src="img/back_arrow.svg" alt="Ir atrás" />
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/')
          }}
        >
          <Image src="img/close_icon.svg" alt="Volver al home" />
        </button>
      </Flex>
      <Flex direction="column">
        <Text marginTop={5} fontSize="lg">
          Cuéntale a sayu cómo te sientes hoy
        </Text>
        <Text fontWeight="bold" marginTop={5} fontSize="sm">
          Registro de dolor
        </Text>
      </Flex>
    </Box>
  )
}
export { TitleHeader }
