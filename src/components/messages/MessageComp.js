import React, { forwardRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { RT } from "../tools/HelperFunctions";
// import { Card, CardContent, Typography } from "@material-ui/core";
import "./messages.css";

export const MessageComp = forwardRef(({ text, username, userFrom }, ref) => {
    // debugger;
    // const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    // displays true if userFrom == undefined
    const isUser = !(userFrom && true);

    return (
        <div ref={ref} className={`message ${isUser && "message__user"}`}>
            <Card
                className={isUser ? "message__userCard" : "message__guestCard"}
            >
                <CardContent sx={{ padding: "7px 12px !important", margin: 0 }}>
                    <Typography
                        color="initial"
                        // variant="subtitle1"
                        component="h5"
                        sx={{ borderRadius: "10px" }}
                    >
                        {RT(text)}
                    </Typography>
                </CardContent>
            </Card>
            <Typography
                className="alignLeft"
                variant="body2"
                sx={{ paddingLeft: "20px", color: "grey !important" }}
                display="block"
                gutterBottom
            >
                {!isUser && "From: " + RT(username)}
            </Typography>
        </div>
    );
});
