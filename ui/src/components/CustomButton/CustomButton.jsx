import React from "react";
import { Button } from "@chakra-ui/core";

function CustomButton(props) {
  return (
    <Button
      border={props.border}
      borderColor={props.borderColor}
      backgroundColor={props.backgroundColor}
      color={props.color}
      width={["100%", "50%", "30%", "25%"]}
      _hover={props.hover}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
}
export { CustomButton };
