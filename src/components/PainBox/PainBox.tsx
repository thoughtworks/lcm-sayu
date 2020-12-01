import React, { FunctionComponent } from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'

const painInformation: any = {
  '0': {
    name: 'No duele',
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
    name: 'Duele mucho',
    icon: <Image src="img/faces/FaceSix.svg" />,
  },
  '8': {
    name: 'Duele mucho más',
    icon: <Image src="img/faces/FaceEight.svg" />,
  },
  '10': {
    name: 'Duele al máximo',
    icon: <Image src="img/faces/FaceTen.svg" />,
  },
}

type PainBoxProps = {
  painLevel: number | undefined
}

const PainBox: FunctionComponent<PainBoxProps> = ({ painLevel }) => (
  <>
    {painLevel !== undefined && (
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
    )}
  </>
)

export { PainBox }
