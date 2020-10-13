import React from "react";
import { render, screen } from "@testing-library/react";
import { FaceScaleScreen } from "../../../src/steps/FaceScaleScreen/FaceScaleScreen";
import { ThemeProvider } from "@chakra-ui/core";

test("should show all instructions to choose a face of face scale screen", () => {
  render(
    <ThemeProvider>
      <FaceScaleScreen />
    </ThemeProvider>
  );
  const sayuTitle = screen.getByText(/Cuéntale a sayu cómo te sientes hoy/i);
  const sayuSubtitle = screen.getByText(/Registro de dolor/i);
  const sayuInstructions = screen.getByText(/Muéstrale a tu hijo\/hija este dibujo y explícale lo siguiente: \"Elige la cara que mejor describa cuánto te duele ahora\"/i);
  expect(sayuTitle).toBeInTheDocument();
  expect(sayuSubtitle).toBeInTheDocument();
  expect(sayuInstructions).toBeInTheDocument();
});
