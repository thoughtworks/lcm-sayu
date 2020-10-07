import React from "react";
import { Text, Image, Stack, Box } from "@chakra-ui/core";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { FaceButton } from "../../components/FaceButton/FaceButton";
import { useHistory } from "react-router-dom";

function FaceScaleScreen({ setPainValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader />
      <Text>
        Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige la
        cara que mejor describa cuánto te duele ahora"
      </Text>
      <Stack isInline marginTop={20}>
        <FaceButton painValue="faceZero" setPainValue={setPainValue} />
        <FaceButton painValue="faceTwo" setPainValue={setPainValue} />
        <FaceButton painValue="faceFour" setPainValue={setPainValue}/>
        <FaceButton painValue="faceSix" setPainValue={setPainValue}/>
        <FaceButton painValue="faceEight" setPainValue={setPainValue}/>
        <FaceButton painValue="faceTen" setPainValue={setPainValue}/>
      </Stack>
    </>
  );
}

export { FaceScaleScreen };
