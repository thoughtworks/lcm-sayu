import React, { useState } from 'react';
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Flex,
    Text, FormControl, FormLabel
  } from "@chakra-ui/core";
  const symptonInfo={
    'cansancio':{min:'Sin cansancio', max:'Máximo cansancio'},
    'nausea':{min:'Sin náusea', max:'Máxima nausea'},
    'depresion':{min:'Sin depresión', max:'Máxima depresión'},
    'ansiedad':{min:'Sin ansiedad', max:'Máxima ansiedad'},
    'somnolencia':{min:'Sin somnolencia', max:'Máxima somnolencia'},
    'apetito':{min:'Buen apetito', max:'Sin apetito'},
    'Bienestar/malestar':{min:'Sin malestar', max:'Máximo malestar'},
    'Falta de aire':{min:'Sin falta de aire', max:'Máxima falta de aire'},
    'Dificultad para dormir':{min:'Sin dificultad para dormir', max:'Máxima dificultad para dormir'}
  }
  function Slider({symptomValue}){
    const [sliderValue, setSliderValue] = useState(0);
      return(
      <Box>
        <FormControl>
          <FormLabel htmlFor={symptomValue}>{symptomValue}</FormLabel>
          <ChakraSlider id={symptomValue} value={sliderValue} onChange={setSliderValue} min={0} max={10} step={2}>
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb size={8}>
              <Box>{sliderValue}</Box>
            </SliderThumb>
          </ChakraSlider>
          <Flex justifyContent={'space-between'}>
          <Text as="sub">{symptonInfo[symptomValue].min}</Text> <Text as="sub">{symptonInfo[symptomValue].max}</Text>
          </Flex>
        </FormControl>
      </Box>);
  }
  export {Slider};