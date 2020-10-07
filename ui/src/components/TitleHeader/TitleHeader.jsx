import React from "react";
import { Image, Box, Flex, Text, Stack } from "@chakra-ui/core";
import BackArrow from "../../assets/images/BackArrow.svg";
import CloseIcon from "../../assets/images/CloseIcon.svg";
import { useHistory } from "react-router-dom";

function TitleHeader() {
  const history = useHistory();
  return (
    <>
      <Flex justify="space-between">
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          <Image src={BackArrow} />
        </button>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          <Image src={CloseIcon} />
        </button>
      </Flex>
      <Flex direction="column">
        <Text marginTop={5}>Cuéntale a Sayu cómo te sientes hoy</Text>
        <Text fontWeight="bold" marginTop={5}>
          Registro de dolor
        </Text>
      </Flex>
    </>
  );
}
export { TitleHeader };
