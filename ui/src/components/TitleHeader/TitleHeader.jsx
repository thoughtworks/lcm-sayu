import React from "react";
import { Image, Box, Flex, Text, Stack } from "@chakra-ui/core";
import BackArrow from "../../assets/images/BackArrow.svg";
import CloseIcon from "../../assets/images/CloseIcon.svg";
import { useHistory } from "react-router-dom";

function TitleHeader(props) {
  const history = useHistory();
  return (
    <Box marginTop={5}>
      <Flex justify="space-between">
        <button
          onClick={() => {
            history.push(props.backArrowRoute);
          }}
        >
          <Image src={BackArrow} />
        </button>
        <button
          onClick={() => {
            history.push(props.closeRoute);
          }}
        >
          <Image src={CloseIcon} />
        </button>
      </Flex>
      <Flex direction="column">
        <Text marginTop={5} fontSize={["md", "lg", "lg", "xl"]}>
          Cuéntale a sayu cómo te sientes hoy
        </Text>
        <Text
          fontWeight="bold"
          marginTop={5}
          fontSize={["sm", "md", "md", "lg"]}
        >
          Registro de dolor
        </Text>
      </Flex>
    </Box>
  );
}
export { TitleHeader };
