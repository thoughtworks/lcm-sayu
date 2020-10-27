import React from 'react'
import { BoxProps, Button } from '@chakra-ui/core'

type CustomButtomProps = {
  backgroundColor: string
  color: string
  label: string
  hover: BoxProps
  onClick: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined
}

const CustomButton = ({
  backgroundColor,
  color,
  label,
  hover,
  onClick,
}: CustomButtomProps) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      color={color}
      width={['100%', '50%', '30%', '25%']}
      _hover={hover}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
export { CustomButton }
