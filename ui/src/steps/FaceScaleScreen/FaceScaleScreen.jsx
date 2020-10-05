import React from "react";
import { Text, Image } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import BackArrow from '../../assets/images/BackArrow.svg';
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
    <button onClick={() => {history.push("/");}}>
        <Image src={BackArrow} />
    </button>
    <Text>Cuéntale a Sayu cómo te sientes hoy</Text>
     <button onClick={() => { setPainValue("FaceZero"); history.push("/symptoms-registry");}}>
           <Image src={FaceZero} />
     </button>
     <button onClick={() => { setPainValue("FaceTwo"); history.push("/symptoms-registry");}}>
            <Image src={FaceTwo} />
     </button>
     <button onClick={() => { setPainValue("FaceFour"); history.push("/symptoms-registry");}}>
            <Image src={FaceFour} />
     </button>
     <button onClick={() => { setPainValue("FaceSix"); history.push("/symptoms-registry");}}>
            <Image src={FaceSix} />
     </button>
     <button onClick={() => { setPainValue("FaceEight"); history.push("/symptoms-registry");}}>
            <Image src={FaceEight} />
     </button>
     <button onClick={() => { setPainValue("FaceTen"); history.push("/symptoms-registry");}}>
            <Image src={FaceTen} />
     </button>
  </>
  );
}

export {FaceScaleScreen};