import './App.css';
import React from "react";
import DefaultLayout from "./components/layouts/defaultLayout/DefaultLayout";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';


function App() {

    const theme = createMuiTheme({
        status: {
            danger: orange[500],
        },
        typography: {
            "fontFamily": `'Nunito Sans', sans-serif;`,
            "fontSize": 14,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        }
    });


    return (
        <ThemeProvider theme={theme}>
        <DefaultLayout/>
        </ThemeProvider>
    );
}
export default App;
