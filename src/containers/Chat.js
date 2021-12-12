import { Box, Container, TextField, Typography } from "@mui/material";
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import io from "socket.io-client";

const Chat = () => {
    const { state } = useLocation();

    const [socket, setSocket] = useState();
    const [error, setError] = useState(false);

    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);

    const [user, setUser] = useState();
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const initSocket = io(process.env.REACT_APP_BACKEND_URL);

        if (state) {
            const name = _.get(state, "name");
            const room = _.get(state, "room");

            setSocket(initSocket);

            initSocket.emit(
                "joinRoom",
                {
                    name,
                    room,
                },
                (error) => {
                    if (error) {
                        setMessagesList((messages) => {
                            return [...messages, error.message];
                        });
                        setError(true);

                        console.log(error);
                    }
                }
            );
        }

        return () => {
            initSocket.disconnect();
            initSocket.off();
        };
    }, [state]);

    useEffect(() => {
        if (socket) {
            socket.on("serverMessage", (response) => {
                const { message, users, user } = response;

                setMessagesList((messages) => {
                    return [...messages, message];
                });

                if (user) {
                    setUser(user);
                }

                if (users) {
                    setUsersList(users);
                }
            });
        }

        return () => {};
    }, [socket]);

    const handleSendMessage = (event) => {
        event.preventDefault();

        socket.emit("sendMessage", message, () => {
            setMessage("");
        });
    };

    return (
        <Container
            sx={{
                height: "100vh",
                overflow: "hidden",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between",
            }}
        >
            <Typography
                sx={{
                    textAlign: "center",
                }}
            >
                <Link to="/">Home</Link>
            </Typography>

            <Typography
                sx={{
                    textAlign: "center",
                }}
                variant="h6"
            >
                Current users in the room are{" "}
                {usersList.map((mappedUser, index) => {
                    return (
                        <Fragment key={mappedUser.id}>
                            <span>
                                {mappedUser.id === user.id
                                    ? "You"
                                    : mappedUser.name}
                            </span>

                            <span>
                                {index !== usersList.length - 1 ? ", " : null}
                            </span>
                        </Fragment>
                    );
                })}
            </Typography>

            <Box
                sx={{
                    flex: 1,
                    overflow: "scroll",
                }}
            >
                {messagesList.map((message, index) => {
                    return (
                        <Box key={index}>
                            {message.from} - {message.text}
                        </Box>
                    );
                })}
            </Box>

            <TextField
                id="message"
                label="Message"
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleSendMessage(event);
                    }
                }}
                disabled={error}
                autoFocus
                fullWidth
            />
        </Container>
    );
};

export default Chat;
