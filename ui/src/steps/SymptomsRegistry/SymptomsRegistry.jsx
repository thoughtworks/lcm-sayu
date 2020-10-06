import React from "react";
import { Text } from "@chakra-ui/core";
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

      <Text>
        ¿Tienes otros síntomas? Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este.
      </Text>

      <Slider symptomValue='cansancio'/>
      <Slider symptomValue='nausea'/>
      <Slider symptomValue='depresion'/>
      <Slider symptomValue='ansiedad'/>
      <Slider symptomValue='somnolencia'/>
      <Slider symptomValue='apetito'/>
      <Slider symptomValue='Bienestar/malestar'/>
      <Slider symptomValue='Falta de aire'/>
      <Slider symptomValue='Dificultad para dormir'/>
    </>
  );
}
export { SymptomsRegistry };
