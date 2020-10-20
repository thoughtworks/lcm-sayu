import React from "react";
import { Text, Stack, Box } from "@chakra-ui/core";
import { Slider } from '../../components/SymptomSlider/SymptomSlider';
import { PainBox } from "../../components/PainBox/PainBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
function SymptomsRegistry({ painValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader backArrowRoute="/face-scale-screen" closeRoute="/" />
      <PainBox painValue={painValue} />

      <Text fontSize="md" mb="8" mt="8">
        ¿Tienes otros síntomas? <br/> Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este.
      </Text>

      <Stack spacing={10}>
        <Box>
          <Slider symptomValue='Cansancio'/>
        </Box>
        <Box>
          <Slider symptomValue='Náusea'/>
        </Box>
        <Box>
          <Slider symptomValue='Depresión'/>
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

      <Stack marginTop={5}>
          <CustomButton
                    backgroundColor="lightGreen"
                    color="white"
                    hover={{ backgroundColor: "lightGrey" }}
                    onClick={() => {
                        history.push("/successful-symptoms-registry");
                    }}
                    label="Guardar"
                />
      </Stack>
      

    </>
  );
}
export { SymptomsRegistry };
