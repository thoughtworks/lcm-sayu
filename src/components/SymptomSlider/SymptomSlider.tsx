import React from 'react'
import { Control, Controller } from 'react-hook-form'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/core'

const symptonInfo: { [key: string]: any } = {
  Cansancio: { min: 'Sin cansancio', max: 'Máximo cansancio' },
  Náusea: { min: 'Sin náusea', max: 'Máxima náusea' },
  Apetito: { min: 'Sin apetito', max: 'Buen apetito' },
  'Falta de aire': { min: 'Sin falta de aire', max: 'Máxima falta de aire' },
  'Dificultad para tragar': {
    min: 'Sin dificultad para tragar',
    max: 'Máxima dificultad para tragar',
  },
}

type SliderProps = {
  symptomValue:
    | 'Cansancio'
    | 'Náusea'
    | 'Apetito'
    | 'Falta de aire'
    | 'Dificultad para tragar'
  control: Control
}

const SymptomSlider = ({ symptomValue, control }: SliderProps) => {
  return (
    <Box>
      <Controller
        control={control}
        name={symptomValue}
        defaultValue={0}
        render={({ onChange, onBlur, value, name }) => (
          <FormControl>
            <FormLabel htmlFor={name}>
              <Stack isInline>
                <Text fontFamily="heading">{name}</Text>
                <Text color="lightPurple" fontFamily="heading">
                  {value}
                </Text>
              </Stack>
            </FormLabel>
            <Stack isInline spacing={2}>
              <Text>0</Text>

              <Slider
                id={name}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                min={0}
                max={10}
                step={1}
              >
                <SliderTrack h={1} />
                <SliderFilledTrack />
                <SliderThumb size={4} bg="lightPurple" />
              </Slider>

              <Text>10</Text>
            </Stack>
            <Flex justifyContent={'space-between'} mt={5}>
              <Text fontSize="xs" color="lightGrey">
                {symptonInfo[name].min}
              </Text>
              <Text fontSize="xs" color="lightGrey">
                {symptonInfo[name].max}
              </Text>
            </Flex>
          </FormControl>
        )}
      />
    </Box>
  )
}
export { SymptomSlider }
