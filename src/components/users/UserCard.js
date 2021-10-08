import React from "react";
import "./Users.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// export const UserCard = ({ user, friend }) => {
export const UserCard = ({
    user,
    addFriend,
    deleteFriend,
    friend,
    friendId,
}) => {
    return (
        <div className="userCard">
            <div className="userCard__info">
                <h3 className="userCard__name">{user.name}</h3>
                <p className="userCard__email">{user.email}</p>
            </div>
            {friend ? (
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
        </div>
    );
};
