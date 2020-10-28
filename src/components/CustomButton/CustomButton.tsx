import React from 'react'
import { Button } from '@chakra-ui/core'

type CustomButtonProps = {
  border?: string
  borderColor?: string
  backgroundColor: string
  color: string
  hover: { [key: string]: any }
  onClick: React.MouseEventHandler<Element>
  label: string
  type?: 'button' | 'submit'
}

function CustomButton({
  border,
  borderColor,
  backgroundColor,
  color,
  hover,
  onClick,
  label,
  type = 'button',
}: CustomButtonProps) {
  return (
    <Button
      border={border}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      color={color}
      width={['100%', '50%', '30%', '25%']}
      _hover={hover}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  )
}
export { CustomButton }
