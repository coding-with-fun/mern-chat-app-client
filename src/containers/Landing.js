import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const handleSignIn = () => {
        navigate("/chat", {
            state: {
                name,
                room,
            },
        });
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <TextField
                    required
                    id="name"
                    label="Name"
                    margin="normal"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    fullWidth
                />

                <TextField
                    required
                    id="room"
                    label="Room"
                    margin="normal"
                    value={room}
                    onChange={(event) => {
                        setRoom(event.target.value);
                    }}
                    fullWidth
                />

                <Button
                    variant="outlined"
                    sx={{
                        marginTop: "2rem",
                    }}
                    onClick={handleSignIn}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
};

export default Landing;
