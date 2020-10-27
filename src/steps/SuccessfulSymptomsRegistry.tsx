import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Image, Text } from '@chakra-ui/core'

import { CustomButton } from 'src/components/CustomButton/CustomButton'

const SuccessfulSymptomsRegistry = () => {
  const router = useRouter()
  return (
    <>
      <Flex direction="column" width="100%" align="center">
        <Image src="img/checkmark.svg" marginTop={20} marginBottom={10}></Image>

        <Text fontSize={['sm']} marginBottom={15}>
          ¡Se han guardado los síntomas exitosamente!
        </Text>
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: 'darkGreen' }}
          onClick={() => {
            router.push('/')
          }}
          label="Volver al inicio"
        />
      </Flex>
    </>
  )
}

export { SuccessfulSymptomsRegistry }
