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
      backgroundColor={backgroundColor}
      color={color}
      width={['100%', '50%', '30%', '25%']}
      _hover={hover}
      onClick={onClick}
      type="submit"
    >
      {label}
    </Button>
  )
}
export { SubmitButton }
