import React from "react";
import { Text, Image } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import faceOne from "./../../assets/images/faces/FaceOne.svg";

function FaceScaleScreen({ setPainValue }) {
  const history = useHistory();
  return (
  <>
    <Text>Cuéntale a Sayu cómo te sientes hoy</Text>
     <button onClick={() => { setPainValue("FaceOne"); history.push("/symptoms-registry");}}>
           <Image src={faceOne} />
     </button>
  </>
  );
}

export {FaceScaleScreen};