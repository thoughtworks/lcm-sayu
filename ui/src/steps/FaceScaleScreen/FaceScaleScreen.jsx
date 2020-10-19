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

        <Text fontSize={["sm"]}>
          Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige
          la cara que mejor describa cuánto te duele ahora"
        </Text>
        <Stack marginTop={20}
          width="100%"
          align="center">
          <Text fontWeight="bold"
           fontSize={["sm"]}
           marginBottom={5}>
            Won-Baker FACES® Pain Rating Scale
          </Text>
        </Stack>
        <Stack isInline width="100%" justifyContent="center">
          <FaceButton painValue="faceZero" setPainValue={setPainValue} />
          <FaceButton painValue="faceTwo" setPainValue={setPainValue} />
          <FaceButton painValue="faceFour" setPainValue={setPainValue} />
          <FaceButton painValue="faceSix" setPainValue={setPainValue} />
          <FaceButton painValue="faceEight" setPainValue={setPainValue} />
          <FaceButton painValue="faceTen" setPainValue={setPainValue} />
        </Stack>
        <Stack
          width="100%"
          align="center">
          <Text  fontSize={["sm"]}
           marginTop={20}>
            © 1983 Wong-Baker FACES Foundation. www.WongBakerFACES.org  Used with permission.
          </Text>
        </Stack>
    </>
  );
}

export { FaceScaleScreen };
