import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";

const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
