import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Image, Text, Stack } from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import logo from "./../../assets/images/sayu_logo.svg";
import wavingHand from "./../../assets/images/waving_hand_emoji.svg";
function WelcomeSayu() {
  const history = useHistory();
  return (
    <Flex direction="column">
      <Image src={logo} width="4em"></Image>

      <Stack
        width="90%"
        marginTop={60}
        align="center"
      >
        <Stack isInline >
          <Text fontWeight="bold" fontSize={["xl"]} align="right">
            Hola
        </Text>
          <Image src={wavingHand} width="2em" />
        </Stack>

        <Text
          marginTop={5}
          fontSize={["sm"]}
        >
          Registra diariamente tus síntomas y podremos analizar mejor tu
          tratamiento
      </Text>
        <Stack marginTop={70} />
        <CustomButton
          backgroundColor="lightGreen"
          color="white"
          hover={{ backgroundColor: "lightGrey" }}
          onClick={() => {
            history.push("/face-scale-screen");
          }}
          label="Comencemos"
        />
      </Stack>

    </Flex>
  );
}
export { WelcomeSayu };
