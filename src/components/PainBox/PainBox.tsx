import React from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'

const painInformation: any = {
  '0': {
    name: 'Sin dolor',
    icon: <Image src="img/faces/FaceZero.svg" />,
  },
  '2': {
    name: 'Duele un poco',
    icon: <Image src="img/faces/FaceTwo.svg" />,
  },
  '4': {
    name: 'Duele un poco más',
    icon: <Image src="img/faces/FaceFour.svg" />,
  },
  '6': {
    name: 'Duele aún más',
    icon: <Image src="img/faces/FaceSix.svg" />,
  },
  '8': {
    name: 'Duele mucho',
    icon: <Image src="img/faces/FaceEight.svg" />,
  },
  '10': {
    name: 'El peor dolor',
    icon: <Image src="img/faces/FaceTen.svg" />,
  },
}

type PainBoxProps = {
  painLevel: number
}

const PainBox = ({ painLevel }: PainBoxProps) =>
  !isNaN(painLevel) ? (
    <Box
      border="1px solid"
      borderRadius="4px"
      padding="1em"
      marginTop={3}
      color="lightPurple"
    >
      <Flex direction="column" align="center">
        <Text>{painInformation[painLevel].icon}</Text>
        <Text>{painInformation[painLevel].name}</Text>
      </Flex>
    </Box>
  ) : null
export { PainBox }
