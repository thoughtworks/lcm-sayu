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
    afterEach(cleanup);})
    test("Should render pain box info", ()=>{
        render(
            <ThemeProvider>
                <SymptomsRegistry  painValue="FaceZero"/>
            </ThemeProvider>
        );
        const painBoxDescription = screen.getByText(/sin dolor/i);
        expect(painBoxDescription).toBeInTheDocument();
    });


