import React from "react";
import { SymptomBox } from "../../components/SymptomBox/SymptomBox";
import { TitleHeader } from "../../components/TitleHeader/TitleHeader";
import { useHistory } from "react-router-dom";
function SymptomsRegistry({ painValue }) {
  const history = useHistory();
  return (
    <>
      <TitleHeader />
      <SymptomBox painValue={painValue} />
    </>
  );
}
export { SymptomsRegistry };
