import React, { useState } from 'react';
import {
   Radio, RadioGroup, Stack, Text
  } from "@chakra-ui/core";

  const symptonInfo={
    'Constipación': {name:'Constipación', description: '¿Ha tenido en las últimas 24 horas deposiciones?'},
    'Fiebre':{name:'Fiebre', description: '¿Ha tenido en las últimas 24 horas fiebre?'}
  }

function SymptomRadioButton({symptomValue}) {
    const [value, setValue] = React.useState("0");
    return (
    <>
      <Text fontFamily="heading">{symptonInfo[symptomValue].name}</Text>
      <Text fontSize="xs" color="lightGrey">{symptonInfo[symptomValue].description}</Text>
      <RadioGroup isInline onChange={e => setValue(e.target.value)} value={value}>
        <Radio variantColor="blue" value="1">Sí</Radio>
        <Radio variantColor="blue" value="0">No</Radio>
      </RadioGroup>
    </>
    );
  }

  export {SymptomRadioButton}