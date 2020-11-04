import React from 'react'
import { Control, Controller } from 'react-hook-form'
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
  symptomValue: 'Constipación' | 'Fiebre'
  control: Control
}

function SymptomRadioButton({
  symptomValue,
  control,
}: SymptomRadioButtonProps) {
  return (
    <Controller
      control={control}
      name={symptomValue}
      defaultValue="0"
      render={({ onChange, onBlur, value, name }) => (
        <>
          <Text fontFamily="heading">{symptonInfo[name].name}</Text>
          <Text fontSize="xs" color="lightGrey">
            {symptonInfo[name].description}
          </Text>
          <RadioGroup
            isInline
            onChange={(_, value) => onChange(value as number)}
            value={value}
            onBlur={onBlur}
          >
            <Radio id={`${name}-1`} variantColor="blue" value="1">
              Sí
            </Radio>
            <Radio id={`${name}-0`} variantColor="blue" value="0">
              No
            </Radio>
          </RadioGroup>
        </>
      )}
    />
  )
}

export { SymptomRadioButton }
