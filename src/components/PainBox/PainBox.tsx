import React from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'

const painInformation: { [key: string]: any } = {
  zero: {
    name: 'Sin dolor',
    icon: <Image src="img/faces/FaceZero.svg" />,
  },
  two: {
    name: 'Duele un poco',
    icon: <Image src="img/faces/FaceTwo.svg" />,
  },
  four: {
    name: 'Duele un poco más',
    icon: <Image src="img/faces/FaceFour.svg" />,
  },
  six: {
    name: 'Duele aún más',
    icon: <Image src="img/faces/FaceSix.svg" />,
  },
  eight: {
    name: 'Duele mucho',
    icon: <Image src="img/faces/FaceEight.svg" />,
  },
  ten: {
    name: 'El peor dolor',
    icon: <Image src="img/faces/FaceTen.svg" />,
  },
}

type PainBoxProps = {
  painLevel: string
}

const PainBox = ({ painLevel }: PainBoxProps) =>
  painLevel ? (
    <Box
      border="1px solid"
      borderRadius="4px"
      padding="1em"
      marginTop={3}
      color="blue"
    >
      <Flex direction="column" align="center">
        <Text>{painInformation[painLevel].icon}</Text>
        <Text>{painInformation[painLevel].name}</Text>
      </Flex>
    </Box>
  ) : null

export { PainBox }
