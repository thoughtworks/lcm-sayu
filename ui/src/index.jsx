import React from "react";
import ReactDOM from "react-dom";
import {SymptomManagement} from "./SymptomManagement/SymptomManagement";
import {BrowserRouter as Router, Route} from 'react-router-dom';
ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <SymptomManagement />
        </Router>
    </React.StrictMode>,
    document.getElementById('app')
 );
