import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Image, Text, Stack } from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import logo from "./../../assets/images/sayu_logo.svg";
import heart from "./../../assets/images/heart_logo.svg";
import wavingHand from "./../../assets/images/waving_hand_emoji.svg";
function WelcomeSayu() {
  const history = useHistory();
  return (
    <Flex direction="column">
       <Stack isInline >
       <Image src={heart} width="2em"></Image>
      <Image src={logo} width="4em"></Image>

     </Stack>
      <Stack
        width="100%"
        marginTop={60}
        align="center"
      >
        <Stack isInline >
          <Text fontWeight="bold" fontSize={["xl"]}>
            Hola
        </Text>
          <Image src={wavingHand} width="2em" />
        </Stack>

        <Text
          marginTop={5}
          fontSize={["sm"]}
        >
          Utiliza esta herramienta para llevar un registro de los síntomas de tu hijo/hija.
      </Text>
        <Stack marginTop={70} />
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: "lightGrey" }}
          onClick={() => {
            history.push("/face-scale-screen");
          }}
          label="Registrar síntomas"
        />
      </Stack>

    </Flex>
  );
}
export { WelcomeSayu };
