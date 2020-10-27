import React, { useState } from 'react'
import {
  Slider as ChakraSlider,
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
  Apetito: { min: 'Buen apetito', max: 'Sin apetito' },
  'Falta de aire': { min: 'Sin falta de aire', max: 'Máxima falta de aire' },
  'Dificultad para tragar': {
    min: 'Sin dificultad para tragar',
    max: 'Máxima dificultad para tragar',
  },
}

type SliderProps = {
  symptomValue: string
}

const Slider = ({ symptomValue }: SliderProps) => {
  const [sliderValue, setSliderValue] = useState(0)
  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor={symptomValue}>
          <Stack isInline>
            <Text fontFamily="heading">{symptomValue}</Text>
            <Text color="lightPurple" fontFamily="heading">
              {sliderValue}
            </Text>
          </Stack>
        </FormLabel>
        <Stack isInline spacing={2}>
          <Text>0</Text>
          <ChakraSlider
            id={symptomValue}
            name={symptomValue}
            value={sliderValue}
            onChange={(sliderValueEvent) => {
              setSliderValue(sliderValueEvent)
            }}
            min={0}
            max={10}
            step={1}
          >
            <SliderTrack h={1} />
            <SliderFilledTrack />
            <SliderThumb size={4} bg="lightPurple" />
          </ChakraSlider>
          <Text>10</Text>
        </Stack>
        <Flex justifyContent={'space-between'} mt={5}>
          <Text fontSize="xs" color="lightGrey">
            {symptonInfo[symptomValue].min}
          </Text>
          <Text fontSize="xs" color="lightGrey">
            {symptonInfo[symptomValue].max}
          </Text>
        </Flex>
      </FormControl>
    </Box>
  )
}
export { Slider }
