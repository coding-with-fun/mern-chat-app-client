import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./containers/Chat";
import Landing from "./containers/Landing";

const App = () => {
    return (
        <Box>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
};

export default App;
