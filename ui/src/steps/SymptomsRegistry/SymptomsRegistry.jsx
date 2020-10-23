import React from "react";
import { Text, Stack, Box, RadioGroup } from "@chakra-ui/core";
import { Slider } from '../../components/SymptomSlider/SymptomSlider';
import { PainBox } from "../../components/PainBox/PainBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { SymptomRadioButton } from "../../components/SymptomRadioButton/SymptomRadioButton";
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
          <Slider symptomValue='Apetito'/>
        </Box>
        <Box>
          <Slider symptomValue='Falta de aire'/>
        </Box>
        <Box>
          <Slider symptomValue='Dificultad para tragar'/>
        </Box>
        <Box>
          <SymptomRadioButton symptomValue='Constipación'/>
        </Box>
        <Box>
          <SymptomRadioButton symptomValue='Fiebre'/>
        </Box>  
      </Stack>


      <Stack marginTop={8}
          width="100%"
          align="center">
          <CustomButton
                    backgroundColor="lightGreen"
                    color="white"
                    hover={{ backgroundColor: "darkGreen" }}
                    onClick={() => {
                        history.push("/successful-symptoms-registry");
                    }}
                    label="Registrar"
                />
      </Stack>
      <Stack marginTop={2}
          width="100%"
          align="center">
          <CustomButton
                    backgroundColor="white"
                    color="lightGreen"
                    borderColor="lightGreen"
                    border="2px"
                    hover={{ backgroundColor: "darkGreen", color:"white" }}
                    onClick={() => {
                        history.push("/failed-symptoms-registry");
                    }}
                    label="Cancelar"
                />
      </Stack>


    </>
  );
}
export { SymptomsRegistry };
