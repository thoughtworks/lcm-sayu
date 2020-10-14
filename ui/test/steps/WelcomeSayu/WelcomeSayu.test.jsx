import { render, screen } from "@testing-library/react";
import React from "react";
import { WelcomeSayu } from "../../../src/steps/WelcomeSayu/WelcomeSayu";
import { ThemeProvider } from "@chakra-ui/core";



test("should show welcome message", ()=>{
    render( <ThemeProvider><WelcomeSayu /></ThemeProvider>)
    const welcomeSayu=screen.getByText(/hola/i)
    expect(welcomeSayu).toBeInTheDocument()
})