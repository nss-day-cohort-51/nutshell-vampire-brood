import { Button, Input } from "@mui/material";
import "./messages.css";
import { useState } from "react";
import React from "react";

export const MessageInput = ({ postMessage }) => {
    const [inputText, setInputText] = useState();

    const onChangeHandler = (text) => {
        setInputText(text);
    };

    return (
        <div className="messageInput" sx={{ display: "flex !important" }}>
            <Input
                id="messageInput__input"
                label=""
                variant="outlined"
                multiline="true"
                minRows="4"
                maxRows="5"
                onChange={(event) => onChangeHandler(event.target.value)}
                value={inputText}
                sx={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "0px !important",
                    margin: "0",
                    width: "80%",
                    marginInline: "10px",
                }}
            />
            <Button
                className="chatSubmitButton"
                sx={{
                    width: "70px",
                    height: "40px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "green",
                    color: "white",
                    marginTop: "10px",
                    "&:hover": { backgroundColor: "darkGreen" },
                }}
                onClick={() => {
                    if (inputText !== "") {
                        postMessage(inputText);
                        setInputText("");
                    }
                }}
            >
                Send
            </Button>
        </div>
    );
};
