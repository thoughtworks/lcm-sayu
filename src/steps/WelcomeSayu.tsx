import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'

import { CustomButton } from 'src/components/CustomButton'

function WelcomeSayu() {
  const router = useRouter()
  return (
    <Flex direction="column">
      <Stack isInline>
        <Image src="img/heart_logo.svg" width="4em"></Image>
        <Image src="img/sayu_logo.svg" width="2em"></Image>
      </Stack>
      <Stack width="100%" marginTop={60} align="center">
        <Stack isInline>
          <Text fontWeight="bold" fontSize={['xl']}>
            Hola
          </Text>
          <Image src="img/waving_hand_emoji.svg" width="2em" />
        </Stack>

        <Text marginTop={5} fontSize={['sm']}>
          Utiliza esta herramienta para llevar un registro de los síntomas de tu
          hijo/hija.
        </Text>
        <Stack marginTop={70} />
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: 'darkGreen' }}
          onClick={() => {
            router.push('/face-scale-screen')
          }}
          label="Registrar síntomas"
        />
      </Stack>
    </Flex>
  )
}
export { WelcomeSayu }
