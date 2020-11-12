import React from 'react'
import { Flex, Image, Text, Stack } from '@chakra-ui/core'
import Link from 'src/components/Link'

function FailedSymptomsRegistry() {
  return (
    <>
      <Flex direction="column" width="100%" align="center">
        <Image src="img/fail_x.svg" marginTop={20} marginBottom={10}></Image>

        <Text fontSize={['sm']} marginBottom={15}>
          Ha ocurrido un error, espera unos minutos e inténtalo nuevamente.
        </Text>
        <Stack marginTop={8} width="100%" align="center">
          <Link href="/face-scale-screen" label="Volver a intentarlo" />
        </Stack>
        <Stack marginTop={2} width="100%" align="center">
          <Link secondaryStyle href="/" label="Salir" />
        </Stack>
      </Flex>
    </>
  )
}

export { FailedSymptomsRegistry }
