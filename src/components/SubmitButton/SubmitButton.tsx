import React, { FunctionComponent } from 'react'
import { Button } from '@chakra-ui/core'

type SubmitButtonProps = {
  onClick?: React.MouseEventHandler<Element>
  label: string
}
const SubmitButton: FunctionComponent<SubmitButtonProps> = ({
  onClick,
  label,
}) => {
  const backgroundColor = 'lightGreen'
  const color = 'white'
  const hover = { backgroundColor: 'darkGreen', color: '' }

  return (
    <Button
      onClick={onClick}
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
