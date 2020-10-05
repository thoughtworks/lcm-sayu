import React, { useState } from "react";
import { Text, Image } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import faceOne from "./../../assets/images/faces/FaceOne.svg";

function FaceScaleScreen() {
  const history = useHistory();
  const [painValue, setPainValue] = useState("faceOne");
  return (
  <>
    <Text>Cuéntale hoy a Sayu cómo te sientes hoy</Text>
     <button onClick={() => { setPainValue("FaceOne"); history.push("/");}}>
           <Image src={faceOne} />
     </button>
  </>
  );
}

export {FaceScaleScreen};