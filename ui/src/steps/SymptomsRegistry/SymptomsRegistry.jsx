import React from "react";
import { PainBox } from "../../components/PainBox/PainBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
function SymptomsRegistry({ painValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader />
      <PainBox painValue={painValue} />
    </>
  );
}
export { SymptomsRegistry };
