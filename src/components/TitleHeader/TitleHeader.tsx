import React, { FunctionComponent } from 'react'
import { Box, Flex, Text } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Icon } from 'src/components/Icon'

import styles from './TitleHeader.module.scss'

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
    <Box paddingTop={5}>
      <Flex justify="space-between">
        <button
          className={styles['back-arrow']}
          type="button"
          onClick={() => router.back()}
        >
          <Icon name="BackArrow" alt="Ir atrás" />
        </button>
        {closeButton && (
          <Link href="/">
            <a className={styles['close']}>
              <Icon name="Close" alt="Volver al home" />
            </a>
          </Link>
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
