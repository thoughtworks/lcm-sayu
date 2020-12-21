import React, { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/core'

type SubmitButtonProps = {
  label: string
}
const SubmitButton: FunctionComponent<SubmitButtonProps> = ({ label }) => {
  const backgroundColor = 'lightGreen'
  const color = 'white'
  const hover = { backgroundColor: 'darkGreen', color: '' }

  return (
    <Button
      type="submit"
      isFullWidth
      color={color}
      backgroundColor={backgroundColor}
      _hover={hover}
    >
      {label}
    </Button>
  )
}
export { SubmitButton }
