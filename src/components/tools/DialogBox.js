// NOT WORKING

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React from "react";
import { RT } from "../tools/HelperFunctions";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogBox({ open, setOpen, onConfirm, text, userId }) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (event) => {
        onConfirm();
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Do You Really Want To {text}?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleConfirm} autoFocus>
                        Agree
                    </Button>
                    <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
