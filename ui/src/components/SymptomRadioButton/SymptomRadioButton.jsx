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
      <RadioGroup onChange={e => setValue(e.target.value)} value={value}>
        <Stack isInline>
            <Radio value="1">Sí</Radio>
            <Radio value="0">No</Radio>
        </Stack>
      </RadioGroup>
    </>
    );
  }

  export {SymptomRadioButton}