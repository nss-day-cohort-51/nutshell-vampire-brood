import React from "react";
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
    const [confirmAddBoxIsOpen, setConfirmAddBoxIsOpen] = useState(false);
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const addFriend = () => {
        const friendObj = { userId: userId, currentUserId: currentUserId };
        API.addEntry("friends", friendObj);
    };

    return (
        <div className="userCard__icon">
            <PersonAddIcon
                onClick={() => {
                    setConfirmAddBoxIsOpen(true);
                }}
            />
            <Dialog
                open={confirmAddBoxIsOpen}
                onClose={() => setConfirmAddBoxIsOpen(false)}
                aria-labelledby="confirm-dialog"
            >
                <DialogTitle id="confirm-dialog">Add Friend</DialogTitle>
                <DialogContent>
                    Are you sure you want to add friend?
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setConfirmAddBoxIsOpen(false)}
                        color="secondary"
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setConfirmAddBoxIsOpen(false);
                            addFriend();
                            handleClick();
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>{" "}
        </div>
    );
};
