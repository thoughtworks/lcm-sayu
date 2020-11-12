import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/core'

import Link from 'src/components/Link'

const SuccessfulSymptomsRegistry = () => (
  <>
    <Flex direction="column" width="100%" align="center">
      <Image src="img/checkmark.svg" marginTop={20} marginBottom={10}></Image>

      <Text fontSize={['sm']} marginBottom={15}>
        ¡Se han guardado los síntomas exitosamente!
      </Text>
      <Link href="/" label="Volver al inicio" />
    </Flex>
  </>
)

export { SuccessfulSymptomsRegistry }
