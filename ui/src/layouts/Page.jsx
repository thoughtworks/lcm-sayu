import { Box } from "@chakra-ui/core";
import React from "react";

function Page({children}) {
    return (
        <Box padding="31px">
            {children}
        </Box>
    );
  }
  export { Page };