import React from "react";
import { Text, Stack, Box, Flex } from "@chakra-ui/core";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { FaceButton } from "../../components/FaceButton/FaceButton";
import { useHistory } from "react-router-dom";

function FaceScaleScreen({ setPainValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader backArrowRoute="/" closeRoute="/" />
      <Box>
        <Text fontSize={["sm"]}>
          Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige
          la cara que mejor describa cuánto te duele ahora"
        </Text>
        <Box marginTop={20}>
          <Text fontWeight="bold"
           fontSize={["sm"]}
           align="center"
           marginBottom={5}
           marginLeft="2em">
            Won-Baker FACES® Pain Rating Scale
          </Text>
        </Box>
        <Stack isInline>
          <FaceButton painValue="faceZero" setPainValue={setPainValue} />
          <FaceButton painValue="faceTwo" setPainValue={setPainValue} />
          <FaceButton painValue="faceFour" setPainValue={setPainValue} />
          <FaceButton painValue="faceSix" setPainValue={setPainValue} />
          <FaceButton painValue="faceEight" setPainValue={setPainValue} />
          <FaceButton painValue="faceTen" setPainValue={setPainValue} />
        </Stack>
          <Text  fontSize={["sm"]}
           marginTop={20}>
            © 1983 Wong-Baker FACES Foundation. www.WongBakerFACES.org  Used with permission.
          </Text>
      </Box>
    </>
  );
}

export { FaceScaleScreen };
