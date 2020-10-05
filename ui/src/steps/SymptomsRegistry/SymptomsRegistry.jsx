import React from "react";
import { SymptomBox } from "../../components/SymptomBox/SymptomBox";
import { useHistory } from "react-router-dom";
function SymptomsRegistry({painValue}) {
  const history = useHistory();
  return (<SymptomBox painValue={painValue} />);
}
export  {SymptomsRegistry} ;
