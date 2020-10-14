import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { SymptomsRegistry } from "../../../src/steps/SymptomsRegistry/SymptomsRegistry";
import { ThemeProvider } from "@chakra-ui/core";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));

describe("<SymptomsRegistry />", ()=>{

    beforeEach(()=>{
        render(
            <ThemeProvider>
                <SymptomsRegistry  painValue="FaceZero"/>
            </ThemeProvider>
        );
          jest.clearAllMocks();
        });

    afterEach(cleanup);

    test("Should render pain box info", ()=>{
        const painBoxDescription = screen.getByText(/sin dolor/i);
        expect(painBoxDescription).toBeInTheDocument();
    });

    test("should show title message", () => {
        const introMessage = screen.getByText(/Cuéntale a sayu cómo te sientes hoy/i)
        expect(introMessage).toBeInTheDocument()
    });
    
    test("should show symptoms message", () => {
        const moreSymptomsMessage = screen.getByText(/¿Tienes otros síntomas?/i)
        expect(moreSymptomsMessage).toBeInTheDocument()
        const registerSymptomsMessage = screen.getByText(/Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este./i)
        expect(registerSymptomsMessage).toBeInTheDocument()
    });
    
    test("should show Cansancio symptom", () => {
        const cansancioText = screen.getByText(/^Cansancio$/i);
        expect(cansancioText).toBeInTheDocument();
        const minCansancioText = screen.getByText(/Sin cansancio/i);
        expect(minCansancioText).toBeInTheDocument();
        const maxCansancioText = screen.getByText(/Máximo Cansancio/i);
        expect(maxCansancioText).toBeInTheDocument();
    });
})