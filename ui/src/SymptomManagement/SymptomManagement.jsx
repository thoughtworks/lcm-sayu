import React, { useState } from "react";
import { WelcomeSayu } from "./../steps/WelcomeSayu/WelcomeSayu";
import { Route, Switch } from "react-router-dom";
function SymptomManagement() {
  return (
    <Route exact path={"/"}>
      <WelcomeSayu />
    </Route>
  );
}
export { SymptomManagement };
