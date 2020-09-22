import React from 'react';
import { useHistory } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/core";

function WelcomeSayu(){
    return(
        <Flex direction="column" align="center">
              <Text fontSize="md" fontWeight="bold">
                SAYU
              </Text>
              <Text>¡HOLA!</Text>
              <Text fontSize="xs">Aquí podrás llevar registro de síntomas</Text>
        </Flex>
    );
}
export {WelcomeSayu}