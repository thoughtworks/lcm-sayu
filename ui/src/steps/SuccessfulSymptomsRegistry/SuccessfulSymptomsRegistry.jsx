import React from "react";
import { useHistory } from "react-router-dom";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader"
import { Flex, Image, Text, } from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import checkmark from "./../../assets/images/checkmark.svg";

function SuccessfulSymptomsRegistry(){
    const history = useHistory();
    return (
        <>

        <Flex direction="column" width="100%" align="center" >
            <Image src={checkmark} marginTop={20} marginBottom={10}></Image>

            <Text fontSize={["sm"]} marginBottom={15}>
            ¡Se han guardado los síntomas exitosamente!
            </Text>

            <CustomButton
                backgroundColor="lightGreen"
                color="white"
                hover={{ backgroundColor: "lightGrey" }}
                onClick={() => {
                    history.push("/");
                }}
                label="Volver al inicio"
            />
        </Flex>
        </>
    );

}

export { SuccessfulSymptomsRegistry };