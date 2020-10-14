import React, { useState } from "react";
import { WelcomeSayu } from "./../steps/WelcomeSayu/WelcomeSayu";
import { FaceScaleScreen } from "./../steps/FaceScaleScreen/FaceScaleScreen";
import { SymptomsRegistry } from "./../steps/SymptomsRegistry/SymptomsRegistry";
import { Route, Switch } from "react-router-dom";
import { Page } from "./../layouts/Page";
function SymptomManagement() {
  const [painValue, setPainValue] = useState("faceZero");
  return (
    <Switch>
      <Route exact path={"/"}>
        <Page>
          <WelcomeSayu />
        </Page>
      </Route>
      <Route exact path={"/face-scale-screen"}>
        <Page>
          <FaceScaleScreen painValue={painValue} setPainValue={setPainValue} />
        </Page>
      </Route>
      <Route exact path={"/symptoms-registry"}>
        <Page>
          <SymptomsRegistry painValue={painValue} />
        </Page>
      </Route>
    </Switch>
  );
}
export { SymptomManagement };
