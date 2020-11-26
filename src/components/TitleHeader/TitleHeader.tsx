import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/core'
import { Navigation } from '../Navigation/Navigation'

const TitleHeader = () => {
  return (
    <Box marginTop={5}>
      <Navigation />
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
