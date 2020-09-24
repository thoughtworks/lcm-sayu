import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Image, Text, Stack} from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import logo from "./../../assets/images/sayu_logo.svg";
import wavingHand from "./../../assets/images/waving_hand_emoji.svg";
function WelcomeSayu() {
  return (
    <Flex direction="column" align="center">
      <Image src={logo}></Image>
      <Text fontSize="md"
       fontWeight="bold">
       SAYU
      </Text>
      <Stack isInline align="center" marginTop={5}>
         <Text fontWeight="bold">Hola</Text>
          <Image src={wavingHand} />
      </Stack>
      <Text marginTop={5}
        marginLeft={10}
        fontSize="s">
        Registra diariamente tus síntomas y podremos analizar mejor tu tratamiento
      </Text>
      <Stack  align="center" width="90%" marginTop={5} marginLeft={10} marginRight={10}>
          <CustomButton
            backgroundColor="lightGreen"
            color="white"
            hover={{ backgroundColor: "lightGrey" }}
            onClick={() => {
              history.push("/escala-caritas");
            }}
            label="Registra síntomas aquí"
          />
      </Stack>
    </Flex>
  );
}
export { WelcomeSayu };
