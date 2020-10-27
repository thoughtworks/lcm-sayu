import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, cleanup, render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { FailedSymptomsRegistry } from "../../../src/steps/FailedSymptomsRegistry/FailedSymptomsRegistry";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));

describe("<FailedSymptomRegistry />", () =>{

    beforeEach(()=>{
        render(
            <ThemeProvider>
                <FailedSymptomsRegistry/>
            </ThemeProvider>
        );
          jest.clearAllMocks();
        });

        afterEach(cleanup);

    test("should show failure message", () => {
        const failureMessage = screen.getByText(/Ha ocurrido un error, espera unos minutos e inténtalo nuevamente/i)
        expect(failureMessage).toBeInTheDocument()
    });

    test("should show welcome screen when button is clicked", () => {
        const retryButton = screen.getByText(/volver a intentarlo/i);
        userEvent.click(retryButton);
        expect(mockPush).toHaveBeenCalledWith("/");
    });
})