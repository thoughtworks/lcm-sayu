import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'
import { CustomButton } from 'src/components/CustomButton/CustomButton'

function FailedSymptomsRegistry() {
  const router = useRouter()
  return (
    <>
      <Flex direction="column" width="100%" align="center">
        <Image src="img/fail_x.svg" marginTop={20} marginBottom={10}></Image>

        <Text fontSize={['sm']} marginBottom={15}>
          Ha ocurrido un error, espera unos minutos e inténtalo nuevamente.
        </Text>
        <Stack marginTop={8} width="100%" align="center">
          <CustomButton
            backgroundColor="lightGreen"
            color="white"
            hover={{ backgroundColor: 'darkGreen' }}
            onClick={() => {
              router.push('/face-scale-screen')
            }}
            label="Volver a intentarlo"
          />
        </Stack>
        <Stack marginTop={2} width="100%" align="center">
          <CustomButton
            backgroundColor="white"
            color="lightGreen"
            borderColor="lightGreen"
            border="2px"
            hover={{ backgroundColor: 'darkGreen', color: 'white' }}
            onClick={() => {
              router.push('/')
            }}
            label="Salir"
          />
        </Stack>
      </Flex>
    </>
  )
}

export { FailedSymptomsRegistry }
