import React from "react";
import APIManager from "../../modules/APIManager";
import "./messages.css";

export const MessageCard = ({
    text,
    userFrom,
    friendId,
    messageId,
    refreshMessages,
}) => {
    const API = new APIManager();
    const deleteMessage = () => {
        return API.delete("messages", messageId).then(() => {
            refreshMessages();
        });
    };
    return (
        <div className="messageCard">
            <div className="messageCard__content">
                <div className="messageCard__from">
                    <strong>{userFrom.name}</strong>
                </div>
                <div className="messageCard__text">
                    <p>{text}</p>
                </div>
            </div>
            <div className="messageCard__interaction">
                <button onClick={deleteMessage}>Delete</button>
            </div>
        </div>
    );
};
