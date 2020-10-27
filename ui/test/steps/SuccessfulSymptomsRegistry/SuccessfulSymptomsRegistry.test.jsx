import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, cleanup, render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { SuccessfulSymptomsRegistry } from "../../../src/steps/SuccessfulSymptomsRegistry/SuccessfulSymptomsRegistry";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));

describe("<SuccessfulSymptomRegistry />", () =>{

    beforeEach(()=>{
        render(
            <ThemeProvider>
                <SuccessfulSymptomsRegistry/>
            </ThemeProvider>
        );
          jest.clearAllMocks();
        });

        afterEach(cleanup);

    test("should show success message", () => {
        const successMessage = screen.getByText(/¡Se han guardado los síntomas exitosamente!/i)
        expect(successMessage).toBeInTheDocument()
    });

    test("should show welcome screen when button is clicked", () => {
        const okButton = screen.getByText(/volver al inicio/i);
        userEvent.click(okButton);
        expect(mockPush).toHaveBeenCalledWith("/");
    });
})