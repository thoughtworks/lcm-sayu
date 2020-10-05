import React from "react";
import { Text, Image } from "@chakra-ui/core";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
import FaceZero from "./../../assets/images/faces/FaceZero.svg";
import FaceTwo from "./../../assets/images/faces/FaceTwo.svg";
import FaceFour from "./../../assets/images/faces/FaceFour.svg";
import FaceSix from "./../../assets/images/faces/FaceSix.svg";
import FaceEight from "./../../assets/images/faces/FaceEight.svg";
import FaceTen from "./../../assets/images/faces/FaceTen.svg";
function FaceScaleScreen({ setPainValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader />
      <Text>
        Muéstrale a tu hijo/hija este dibujo y explícale lo siguiente: "Elige la
        cara que mejor describa cuánto te duele ahora"
      </Text>
      <button
        onClick={() => {
          setPainValue("FaceZero");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceZero} />
        <Text>0</Text>
        <Text>Sin dolor</Text>
      </button>
      <button
        onClick={() => {
          setPainValue("FaceTwo");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceTwo} />
        <Text>2</Text>
        <Text>Duele un poco</Text>
      </button>
      <button
        onClick={() => {
          setPainValue("FaceFour");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceFour} />
        <Text>4</Text>
        <Text>Duele un poco más</Text>
      </button>
      <button
        onClick={() => {
          setPainValue("FaceSix");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceSix} />
        <Text>6</Text>
        <Text>Duele aún más</Text>
      </button>
      <button
        onClick={() => {
          setPainValue("FaceEight");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceEight} />
        <Text>8</Text>
        <Text>Duele mucho</Text>
      </button>
      <button
        onClick={() => {
          setPainValue("FaceTen");
          history.push("/symptoms-registry");
        }}
      >
        <Image src={FaceTen} />
        <Text>10</Text>
        <Text>El peor dolor</Text>
      </button>
    </>
  );
}

export { FaceScaleScreen };
