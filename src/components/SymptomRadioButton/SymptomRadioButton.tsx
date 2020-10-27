import React, { useState } from 'react'
import { Radio, RadioGroup, Text } from '@chakra-ui/core'

const symptonInfo: { [key: string]: any } = {
  Constipación: {
    name: 'Constipación',
    description: '¿Ha tenido en las últimas 24 horas deposiciones?',
  },
  Fiebre: {
    name: 'Fiebre',
    description: '¿Ha tenido en las últimas 24 horas fiebre?',
  },
}

type SymptomRadioButtonProps = {
  symptomValue: string
}

function SymptomRadioButton({ symptomValue }: SymptomRadioButtonProps) {
  const [value, setValue] = useState('0')
  return (
    <>
      <Text fontFamily="heading">{symptonInfo[symptomValue].name}</Text>
      <Text fontSize="xs" color="lightGrey">
        {symptonInfo[symptomValue].description}
      </Text>
      <RadioGroup
        isInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <Radio variantColor="blue" value="1">
          Sí
        </Radio>
        <Radio variantColor="blue" value="0">
          No
        </Radio>
      </RadioGroup>
    </>
  )
}

export { SymptomRadioButton }
