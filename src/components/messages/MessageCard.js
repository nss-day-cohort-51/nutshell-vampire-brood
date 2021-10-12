import React from "react";
import "./messages.css";

export const MessageCard = ({ text, userFrom, friendId }) => {
    return (
        <div className="messageCard">
            <div className="messageCard__content">
                <div className="messageCard__text">
                    <p>{text}</p>
                </div>
                <div className="messageCard__from">
                    <strong>{userFrom.name}</strong>
                </div>
            </div>
        </div>
    );
};
