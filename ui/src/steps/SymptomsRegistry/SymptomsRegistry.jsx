import React from "react";
import { Text, Stack, Box } from "@chakra-ui/core";
import { Slider } from '../../components/SymptomSlider/SymptomSlider';
import { SymptomBox } from "../../components/SymptomBox/SymptomBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
function SymptomsRegistry({ painValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader />

      <SymptomBox painValue={painValue} />

      <Text fontSize="md" mb="8" mt="8">
        ¿Tienes otros síntomas? <br/> Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este.
      </Text>

      <Stack spacing={10}>
        <Box>
          <Slider symptomValue='Cansancio'/>
        </Box>
        <Box>
          <Slider symptomValue='Nausea'/>
        </Box>
        <Box>
          <Slider symptomValue='Depresion'/>
        </Box>
        <Box>
          <Slider symptomValue='Ansiedad'/>
        </Box>
        <Box>
          <Slider symptomValue='Somnolencia'/>
        </Box>
        <Box>
          <Slider symptomValue='Apetito'/>
        </Box>
        <Box>
          <Slider symptomValue='Bienestar/Malestar'/>
        </Box>
        <Box>
          <Slider symptomValue='Falta de aire'/>
        </Box>
        <Box>
          <Slider symptomValue='Dificultad para dormir'/>
        </Box>
      </Stack>
    </>
  );
}
export { SymptomsRegistry };
