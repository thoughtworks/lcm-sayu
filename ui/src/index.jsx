import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from 'emotion-theming';
import {CSSReset}  from '@chakra-ui/core';
import {customTheme} from './theme/customTheme';
import {SymptomManagement} from "./SymptomManagement/SymptomManagement";
import {BrowserRouter as Router, Route} from 'react-router-dom';
ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <ThemeProvider theme={customTheme}>
                <CSSReset/>
                <SymptomManagement />
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('app')
 );
