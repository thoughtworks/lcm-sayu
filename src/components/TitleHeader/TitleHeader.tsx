import React, { FunctionComponent } from 'react'
import { Image, Box, Flex, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'

type TitleHeaderProps = {
  closeButton?: boolean
  title?: string
  subtitle?: string
}

const TitleHeader: FunctionComponent<TitleHeaderProps> = ({
  closeButton,
  title,
  subtitle,
}) => {
  const router = useRouter()
  return (
    <Box marginTop={5}>
      <Flex justify="space-between">
        <button type="button" onClick={() => router.back()}>
          <Image src="/img/back_arrow.svg" alt="Ir atrás" />
        </button>
        {closeButton && (
          <button
            type="button"
            onClick={() => {
              router.push('/')
            }}
          >
            <Image src="/img/close_icon.svg" alt="Volver al home" />
          </button>
        )}
      </Flex>
      <Flex direction="column">
        {title && (
          <Text marginTop={5} fontSize="lg">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text fontWeight="bold" marginTop={5} fontSize="sm">
            {subtitle}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
export { TitleHeader }
