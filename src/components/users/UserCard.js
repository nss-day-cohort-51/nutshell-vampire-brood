import React from "react";
import "./Users.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MessageIcon from "@mui/icons-material/Message";
import { useHistory } from "react-router";

// export const UserCard = ({ user, friend }) => {
export const UserCard = ({
    user,
    addFriend,
    deleteFriend,
    isFriend,
    friendId,
}) => {
    const history = useHistory();

    const handleMessageClicked = () => {
        history.pushState("/messages");
    };

    return (
        <div className="userCard">
            <div className="userCard__info">
                <h3 className="userCard__name">{user.name}</h3>
                <p className="userCard__email">{user.email}</p>
            </div>
            <div>
                {isFriend ? (
                    <div
                        onClick={() => deleteFriend(friendId)}
                        className="userCard__icon"
                    >
                        <PersonRemoveIcon />
                    </div>
                ) : (
                    <div
                        onClick={() => addFriend(user.id)}
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
            </div>
        </div>
    );
};
