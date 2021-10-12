import React from "react";
import APIManager from "../../modules/APIManager";
import "./messages.css";
import { useState } from "react";

export const MessageCard = ({
    text,
    userFrom,
    messageId,
    refreshMessages,
    message,
}) => {
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const [editing, setEditing] = useState(false);
    const [messageText, setMessageText] = useState(text);

    const API = new APIManager();
    const deleteMessage = () => {
        return API.delete("messages", messageId).then(() => {
            refreshMessages();
        });
    };

    const editMessage = () => {
        const newMessage = { ...message };
        newMessage["text"] = messageText;
        delete newMessage["user"];
        return API.updateEntry("messages", newMessage);
    };

    const handleInputChange = (event) => {
        setMessageText(event.target.value);
    };

    const messageCardMD = !editing ? (
        <div className="messageCard">
            <div className="messageCard__content">
                <div className="messageCard__from">
                    <strong>{userFrom.name}</strong>
                </div>
                <div className="messageCard__text">
                    <p>{text}</p>
                </div>
            </div>
            {currentUserId == userFrom.id ? (
                <div className="messageCard__interaction">
                    <button onClick={deleteMessage}>Delete</button>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </div>
            ) : null}
        </div>
    ) : (
        <div className="messageCard">
            <form
                className="messageList__input-box"
                onSubmit={(event) => {
                    editMessage();
                }}
            >
                <fieldset>
                    <input
                        type="text"
                        id="messageList__text"
                        className="messageList__text"
                        required
                        autoFocus
                        value={messageText}
                        onChange={handleInputChange}
                    />
                </fieldset>
                <fieldset>
                    <button
                        type="submit"
                        onClick={(event) => {
                            event.preventDefault();
                            setEditing(false);
                        }}
                    >
                        Send
                    </button>
                </fieldset>
            </form>
        </div>
    );

    return messageCardMD;
};
