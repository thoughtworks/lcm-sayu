import React from "react";
import { Image, Text, Flex } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import FaceZero from "./../../assets/images/faces/FaceZero.svg";
import FaceTwo from "./../../assets/images/faces/FaceTwo.svg";
import FaceFour from "./../../assets/images/faces/FaceFour.svg";
import FaceSix from "./../../assets/images/faces/FaceSix.svg";
import FaceEight from "./../../assets/images/faces/FaceEight.svg";
import FaceTen from "./../../assets/images/faces/FaceTen.svg";

const faceInfo = {
  faceZero: {
    img: FaceZero,
    number: "0",
    description: "No duele",
    click: "FaceZero",
  },
  faceTwo: {
    img: FaceTwo,
    number: "2",
    description: "Duele un poco",
    click: "FaceTwo",
  },
  faceFour: {
    img: FaceFour,
    number: "4",
    description: "Duele un poco más",
    click: "FaceFour",
  },
  faceSix: {
    img: FaceSix,
    number: "6",
    description: "Duele mucho",
    click: "FaceSix",
  },
  faceEight: {
    img: FaceEight,
    number: "8",
    description: "Duele mucho más",
    click: "FaceEight",
  },
  faceTen: {
    img: FaceTen,
    number: "10",
    description: "Duele al máximo",
    click: "FaceTen",
  },
};
function FaceButton({ painValue, setPainValue }) {
  const history = useHistory();
  return (
    <Flex direction="column" align="center">
      <button
        onClick={() => {
          setPainValue(faceInfo[painValue].click);
          history.push("/symptoms-registry");
        }}
      >
        <Image
          src={faceInfo[painValue].img}
          alt={faceInfo[painValue].description}
        />
      </button>
      <Text textAlign="center">{faceInfo[painValue].number}</Text>
      <Text
        paddingLeft={[1, 2, 3, 10]}
        textAlign="center"
        fontSize={["sm", "md", "lg", "xl"]}
      >
        {faceInfo[painValue].description}
      </Text>
    </Flex>
  );
}
export { FaceButton };
