import React from "react";
import { Image, Text } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import FaceZero from "./../../assets/images/faces/FaceZero.svg";
import FaceTwo from "./../../assets/images/faces/FaceTwo.svg";
import FaceFour from "./../../assets/images/faces/FaceFour.svg";
import FaceSix from "./../../assets/images/faces/FaceSix.svg";
import FaceEight from "./../../assets/images/faces/FaceEight.svg";
import FaceTen from "./../../assets/images/faces/FaceTen.svg";

const faceInfo={
    'faceZero':{img:FaceZero, number:'0', description:'Sin dolor'},
    'faceTwo':{img:FaceTwo, number:'2', description:'Duele un poco'},
    'faceFour':{img:FaceFour, number:'4', description:'Duele un poco más'},
    'faceSix':{img:FaceSix, number:'6', description:'Duele aún más'},
    'faceEight':{img:FaceEight, number:'8', description:'Duele mucho'},
    'faceTen':{img:FaceTen, number:'10', description:'El peor dolor'},
  }
function FaceButton(props){
const history = useHistory();
    return(
    <>
        <button
            onClick={() => {
              setPainValue("FaceZero");
              history.push("/symptoms-registry");
            }}
          >
            <Image src={faceInfo[props.painValue].img}/>
            <Text>{faceInfo[props.painValue].number}</Text>
            <Text>{faceInfo[props.painValue].description}</Text>
          </button>
    </>
    );
}
export { FaceButton };