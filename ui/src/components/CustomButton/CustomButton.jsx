import React from 'react';
import { Button} from '@chakra-ui/core';

function CustomButton(props){
return (<Button backgroundColor={props.backgroundColor} variant={props.variant}  variantColor={props.variantColor} color={props.color} width={["100%", "50%", "25%", "15%"]} _hover={props.hover} onClick={props.onClick}>{props.label}</Button>);
}
export {CustomButton}