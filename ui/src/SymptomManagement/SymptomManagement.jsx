import React, { useState } from "react";
import { WelcomeSayu } from "./../steps/WelcomeSayu/WelcomeSayu";
import { FaceScaleScreen } from "./../steps/FaceScaleScreen/FaceScaleScreen";
import { SymptomsRegistry } from "./../steps/SymptomsRegistry/SymptomsRegistry";
import { Route, Switch } from "react-router-dom";
function SymptomManagement() {
  const [painValue, setPainValue] = useState("faceZero");
  return (
    <Switch>
      <Route exact path={"/"}>
        <WelcomeSayu />
      </Route>
      <Route exact path={"/face-scale-screen"}>
        <FaceScaleScreen painValue={painValue} setPainValue={setPainValue} />
      </Route>
      <Route exact path={"/symptoms-registry"}>
        <SymptomsRegistry painValue={painValue} />
      </Route>
    </Switch>
  );
}
export { SymptomManagement };
