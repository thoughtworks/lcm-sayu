import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import logo from "./../../assets/images/logo.png";
import wavingHand from "./../../assets/images/waving_hand.png";
function WelcomeSayu() {
  return (
    <Flex direction="column" align="center">
      <Image src={logo}></Image>
      <Text fontSize="md" fontWeight="bold">
        SAYU
      </Text>
      <Text fontWeight="bold">
        HOLA <Image src={wavingHand} />
      </Text>
      <Text fontSize="xs">Aquí podrás llevar registro de síntomas</Text>
      <CustomButton
        backgroundColor="lightGreen"
        color="blanco"
        hover={{ backgroundColor: "ligthGrey" }}
        onClick={() => {
          history.push("/escala-caritas");
        }}
        label="Registra síntomas aquí"
      />
    </Flex>
  );
}
export { WelcomeSayu };
