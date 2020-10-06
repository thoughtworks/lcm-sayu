import React from 'react';
import { Image, Box, Flex, Text } from "@chakra-ui/core";
import BackArrow from '../../assets/images/BackArrow.svg';
import { useHistory } from "react-router-dom";

function TitleHeader(){
    const history = useHistory();
    return(
    <>
      <button onClick={() => {history.push("/");}}>
            <Image src={BackArrow} />
       </button>
       <Text>Cuéntale a Sayu cómo te sientes hoy</Text>
       <Text fontWeight="bold">Registro de dolor</Text>
    </>
    );
}
export {TitleHeader};