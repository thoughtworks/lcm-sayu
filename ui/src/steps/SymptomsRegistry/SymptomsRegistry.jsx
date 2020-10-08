import React from "react";
import { Box } from "@chakra-ui/core";
import { PainBox } from "../../components/PainBox/PainBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
function SymptomsRegistry({ painValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader backArrowRoute="/face-scale-screen" closeRoute="/" />
      <PainBox painValue={painValue} />
    </>
  );
}
export { SymptomsRegistry };
