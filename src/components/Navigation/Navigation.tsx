import React from 'react'
import { Image, Flex } from '@chakra-ui/core'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()
  return (
    <Flex justify="space-between">
      <button type="button" onClick={() => router.back()}>
        <Image src="img/back_arrow.svg" alt="Ir atrás" />
      </button>
      <button
        type="button"
        onClick={() => {
          router.push('/')
        }}
      >
        <Image src="img/close_icon.svg" alt="Volver al home" />
      </button>
    </Flex>
  )
}

export { Navigation }
