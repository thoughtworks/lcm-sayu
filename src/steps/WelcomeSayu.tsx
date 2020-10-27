import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'

import { CustomButton } from 'src/components/CustomButton'

const WelcomeSayu = () => {
  const router = useRouter()

  return (
    <Flex direction="column" align="center">
      <Image src="img/sayu-logo.svg"></Image>
      <Text fontSize={['lg', 'lg', 'lg', 'xl']} fontWeight="bold">
        SAYU
      </Text>
      <Stack isInline align="center" marginTop={5}>
        <Text fontWeight="bold" fontSize={['lg', 'lg', 'lg', 'xl']}>
          Hola
        </Text>
        <Image src="img/waving-hand-emoji.svg" />
      </Stack>
      <Text marginTop={5} fontSize={['sm', 'md', 'lg', 'xl']}>
        Registra diariamente tus síntomas y podremos analizar mejor tu
        tratamiento
      </Text>
      <Stack align="center" width="90%" marginTop={10}>
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: 'lightGrey' }}
          onClick={() => {
            router.push('/face-scale-screen')
          }}
          label="Registra síntomas aquí"
        />
      </Stack>
    </Flex>
  )
}
export { WelcomeSayu }
