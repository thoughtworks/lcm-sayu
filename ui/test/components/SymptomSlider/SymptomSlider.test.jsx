import React from 'react';
import { Slider as SymtomSlider } from '../../../src/components/SymptomSlider/SymptomSlider';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';
import "regenerator-runtime/runtime";

test("Should change symptom level value when it moves to right side", async()=>{
    render(<ThemeProvider><SymtomSlider symptomValue="Náusea"/></ThemeProvider>);
    const sliderButton =screen.getByRole('slider');
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    fireEvent.keyDown(sliderButton, { key: 'ArrowRight', code: 'ArrowRight' })
    expect(await screen.findByText('3')).toBeVisible();
});

test("Should show the right symptom text", async()=>{
    render(<ThemeProvider><SymtomSlider symptomValue="Náusea"/></ThemeProvider>);
    const nauseaText = screen.getByText(/^Náusea$/i);
    expect(nauseaText).toBeInTheDocument();
    const minNauseaText = screen.getByText(/Sin náusea/i);
    expect(minNauseaText).toBeInTheDocument()
    const maxNauseaText = screen.getByText(/Máxima náusea/i);
    expect(maxNauseaText).toBeInTheDocument()
});