import React from 'react';
import { Image, Box, Flex, Text } from "@chakra-ui/core";
import FaceZero from '../../assets/images/faces/FaceZero.svg';
import FaceTwo from '../../assets/images/faces/FaceTwo.svg';
import FaceFour from '../../assets/images/faces/FaceFour.svg';
import FaceSix from '../../assets/images/faces/FaceSix.svg';
import FaceEight from '../../assets/images/faces/FaceEight.svg';
import FaceTen from '../../assets/images/faces/FaceTen.svg';


const painInformation={
    'FaceZero':{name:'Sin dolor', icon:<Image src={FaceZero}/>},
    'FaceTwo':{name:'Duele un poco', icon:<Image src={FaceTwo}/>},
    'FaceFour':{name:'Duele un poco más', icon:<Image src={FaceFour}/>},
    'FaceSix':{name:'Duele aún más', icon:<Image src={FaceSix}/>},
    'FaceEight':{name:'Duele mucho', icon:<Image src={FaceEight}/>},
    'FaceTen':{name:'El peor dolor', icon:<Image src={FaceTen}/>},
 }
 function SymptomBox(props){
     return(
     <Box border='1px solid' borderRadius='4px' padding='1em'>
          <Flex justifyContent={'space-between'}>
                <Text>{painInformation[props.painValue].name}</Text>
               <Text>{painInformation[props.painValue].icon}</Text>
          </Flex>
     </Box>
     );

 }
 export {SymptomBox};
