import React from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'

type TitleHeaderProps = {
  backArrowRoute: string
  closeRoute: string
}

const TitleHeader = ({ backArrowRoute, closeRoute }: TitleHeaderProps) => {
  const router = useRouter()
  return (
    <Box marginTop={5}>
      <Flex justify="space-between">
        <button
          onClick={() => {
            router.push(backArrowRoute)
          }}
        >
          <Image src="public/img/BackArrow.svg" />
        </button>
        <button
          onClick={() => {
            router.push(closeRoute)
          }}
        >
          <Image src="public/img/CloseIcon.svg" />
        </button>
      </Flex>
      <Flex direction="column">
        <Text marginTop={5} fontSize={['md', 'lg', 'lg', 'xl']}>
          Cuéntale a sayu cómo te sientes hoy
        </Text>
        <Text
          fontWeight="bold"
          marginTop={5}
          fontSize={['sm', 'md', 'md', 'lg']}
        >
          Registro de dolor
        </Text>
      </Flex>
    </Box>
  )
}
export { TitleHeader }
