import React from "react";
import { render, screen } from "@testing-library/react";
import { FaceScaleScreen } from "../../../src/steps/FaceScaleScreen/FaceScaleScreen";
import { ThemeProvider } from "@chakra-ui/core";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));
test("should show all instructions to choose a face of face scale screen", () => {
  render(
    <ThemeProvider>
      <FaceScaleScreen />
    </ThemeProvider>
  );
  const sayuTitle = screen.getByText(/Cuéntale a sayu cómo te sientes hoy/i);
  const sayuSubtitle = screen.getByText(/Registro de dolor/i);
  const sayuInstructions = screen.getByText(
    /Muéstrale a tu hijo\/hija este dibujo y explícale lo siguiente: \"Elige la cara que mejor describa cuánto te duele ahora\"/i
  );
  expect(sayuTitle).toBeInTheDocument();
  expect(sayuSubtitle).toBeInTheDocument();
  expect(sayuInstructions).toBeInTheDocument();
});

test("should render face info of face scale screen ", () => {
  const setPainValueMock = jest.fn();
  render(
    <ThemeProvider>
      <FaceScaleScreen setPainValue={setPainValueMock} painValue="faceZero" />
    </ThemeProvider>
  );
  const faceNumberZeroButton = screen.getByAltText(/^no duele$/i);
  screen.debug();
  userEvent.click(faceNumberZeroButton);
  expect(setPainValueMock).toHaveBeenCalledWith("FaceZero");
});
