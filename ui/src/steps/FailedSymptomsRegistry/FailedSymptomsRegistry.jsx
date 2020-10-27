import React from "react";
import { useHistory } from "react-router-dom";
import { Flex, Image, Text, Stack } from "@chakra-ui/core";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import x from "./../../assets/images/fail_x.svg";

function FailedSymptomsRegistry(){
    const history = useHistory();
    return (
        <>
        <Flex direction="column" width="100%" align="center" >
            <Image src={x} marginTop={20} marginBottom={10}></Image>

            <Text fontSize={["sm"]} marginBottom={15}>
            Ha ocurrido un error, espera unos minutos e inténtalo nuevamente.
            </Text>
            <Stack marginTop={8}
             width="100%"
             align="center">
                <CustomButton
                    backgroundColor="lightGreen"
                    color="white"
                    hover={{ backgroundColor: "darkGreen" }}
                    onClick={() => {
                        history.push("/");
                    }}
                    label="Volver a intentarlo"
                />
            </Stack>
            <Stack marginTop={2}
             width="100%"
             align="center">
             <CustomButton
                    backgroundColor="white"
                    color="lightGreen"
                    borderColor="lightGreen"
                    border="2px"
                    hover={{ backgroundColor: "darkGreen", color:"white" }}
                    onClick={() => {
                        history.push("/successful-symptoms-registry");
                    }}
                    label="Salir"
                />
            </Stack>
        </Flex>
        </>
    );

}

export { FailedSymptomsRegistry };