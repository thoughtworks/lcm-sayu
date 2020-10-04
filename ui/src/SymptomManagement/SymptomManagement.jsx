import React, { useState } from "react";
import { WelcomeSayu } from "./../steps/WelcomeSayu/WelcomeSayu";
import { FaceScaleScreen } from "./../steps/FaceScaleScreen/FaceScaleScreen";
import { Route, Switch } from "react-router-dom";
function SymptomManagement() {
  return (
      <Switch>
        <Route exact path={"/"}>
          <WelcomeSayu />
        </Route>
        <Route exact path={"/face-scale-screen"}>
          <FaceScaleScreen/>
        </Route>
      </Switch>
  );
}
export { SymptomManagement };
