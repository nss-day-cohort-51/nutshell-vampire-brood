import React from "react";
import { RT } from "../tools/HelperFunctions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import APIManager from "../../modules/APIManager";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const AddUserIcon = ({ userId, handleClick }) => {
    const API = new APIManager();
    const [open, setOpen] = useState(false);
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const addFriend = () => {
        const friendObj = { userId: userId, currentUserId: currentUserId };
        return API.addEntry("friends", friendObj);
    };

    return (
        <div className="userCard__icon">
            <PersonAddIcon
                onClick={() => {
                    setOpen(true);
                }}
            />
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle id="confirm-dialog">Add Friend</DialogTitle>
                <DialogContent>
                    {RT("Are you sure you want to add friend?")}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(false)}
                        color="secondary"
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpen(false);
                            addFriend().then(handleClick);
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>{" "}
        </div>
    );
};
