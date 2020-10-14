import { render, screen } from "@testing-library/react";
import React from "react";
import { SymptomsRegistry } from "../../../src/steps/SymptomsRegistry/SymptomsRegistry";
import { ThemeProvider } from "@chakra-ui/core";

test("should show title message", () => {
    render(<ThemeProvider><SymptomsRegistry painValue="FaceFour"/></ThemeProvider>)
    const introMessage = screen.getByText(/Cuéntale a sayu cómo te sientes hoy/i)
    expect(introMessage).toBeInTheDocument()
})

test("should show pain message", () => {
    render(<ThemeProvider><SymptomsRegistry painValue="FaceFour"/></ThemeProvider>)
    const painMessage = screen.getByText(/Duele un poco más/i)
    expect(painMessage).toBeInTheDocument()
})

test("should show symptoms message", () => {
    render(<ThemeProvider><SymptomsRegistry painValue="FaceFour"/></ThemeProvider>)
    const moreSymptomsMessage = screen.getByText(/¿Tienes otros síntomas?/i)
    expect(moreSymptomsMessage).toBeInTheDocument()
    const registerSymptomsMessage = screen.getByText(/Regístralos considerando que 0 es ausencia del síntoma y 10 es la mayor intensidad de este./i)
    expect(registerSymptomsMessage).toBeInTheDocument()
})

test("should show Cansancio symptom", () => {
    render(<ThemeProvider><SymptomsRegistry painValue="FaceFour"/></ThemeProvider>)
    const cansancioText = screen.getByText(/^Cansancio$/i);
    expect(cansancioText).toBeInTheDocument();
    const minCansancioText = screen.getByText(/Sin cansancio/i);
    expect(minCansancioText).toBeInTheDocument()
    const maxCansancioText = screen.getByText(/Máximo Cansancio/i);
    expect(maxCansancioText).toBeInTheDocument()
})