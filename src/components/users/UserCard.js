import React from "react";
import "./Users.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import { useHistory } from "react-router";
import { ConfirmationBox } from "../tools/ConfirmationBox";
import { useState, useEffect } from "react";

export const UserCard = ({
    user,
    addFriend,
    deleteFriend,
    friendIds,
    friendId,
    isFriend,
}) => {
    const [confirmAddBoxIsOpen, setConfirmAddBoxIsOpen] = useState(false);
    const [confirmDeleteBoxIsOpen, setConfirmDeleteBoxIsOpen] = useState(false);

    const [isFriendState, setIsFriend] = useState(isFriend);

    const history = useHistory();
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const handleMessageClicked = () => {
        history.push(`/messages/${user.id}`);
    };

    const getIsFriend = () => {
        return fetch(
            `http://localhost:8088/friends?userId=${user.id}&currentUserId=${currentUserId}`
        ).then((res) => res.json());
    };

    useEffect(() => {
        getIsFriend().then((resObj) => {
            setIsFriend(resObj.length > 0);
        });
    }, [friendIds]);

    return (
        <div className="userCard">
            <div className="userCard__info">
                <h3 className="userCard__name">{user.name}</h3>
                <p className="userCard__email">{user.email}</p>
            </div>
            <div className="userCard__interaction">
                {isFriendState ? (
                    <div
                        onClick={() => setConfirmDeleteBoxIsOpen(true)}
                        className="userCard__icon"
                    >
                        <PersonRemoveIcon />
                    </div>
                ) : (
                    <div
                        // onClick={() => addFriend(user.id)}
                        onClick={() => setConfirmAddBoxIsOpen(true)}
                        className="userCard__icon"
                    >
                        <PersonAddIcon />
                    </div>
                )}
                <div
                    className="userCard__message"
                    onClick={handleMessageClicked}
                >
                    <MessageIcon />
                </div>
                <div>
                    <ConfirmationBox
                        title="Delete Friend?"
                        open={confirmDeleteBoxIsOpen}
                        setOpen={setConfirmDeleteBoxIsOpen}
                        onConfirm={() => {
                            setIsFriend(false);
                            deleteFriend(friendId);
                        }}
                    >
                        Are you sure you want to delete friend?
                    </ConfirmationBox>
                    <ConfirmationBox
                        title="Add Friend?"
                        open={confirmAddBoxIsOpen}
                        setOpen={setConfirmAddBoxIsOpen}
                        onConfirm={() => {
                            addFriend(user.id);
                            setIsFriend(true);
                        }}
                    >
                        Are you sure you want to add friend?
                    </ConfirmationBox>
                </div>
            </div>
        </div>
    );
};
