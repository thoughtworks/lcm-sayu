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
        const successMessage = screen.getByText(/¡Tu registro se ha guardado exitosamente!/i)
        expect(successMessage).toBeInTheDocument()
    });

    test("should show welcome screen when button is clicked", () => {
        const okButton = screen.getByText(/Ok, volver/i);
        userEvent.click(okButton);
        expect(mockPush).toHaveBeenCalledWith("/");
    });
})