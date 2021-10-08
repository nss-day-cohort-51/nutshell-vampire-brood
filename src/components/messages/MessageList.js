import React from "react";
import { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { MessageCard } from "./MessageCard";
import "./messages.css";

export const MessageList = ({ activeUserId }) => {
    // let userMessages = messages ? messages : [];
    const [userMessages, setUserMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    // const [messages, setMessages] = useState([]);

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const API = new APIManager();

    const getActiveMessages = () => {
        fetch(
            `http://localhost:8088/messages?userToId=${currentUserId}&userToId=${activeUserId}&userId=${activeUserId}&userId=${currentUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((messageObjs) => {
                setUserMessages(messageObjs);
            });
    };

    const postMessage = (text) => {
        const textObj = {
            userId: currentUserId,
            userToId: activeUserId,
            text: text,
        };
        return API.addEntry("messages", textObj).then(getActiveMessages);
    };

    const handleInputChange = (event) => {
        setMessageText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postMessage(messageText);
    };

    // const addMessage = (messageId) => {
    //     const messageObj = {
    //         userId: messageId,
    //         currentUserId: currentUserId,
    //     };
    //     return API.addEntry("messages", messageObj).then(getMessages);
    // };

    // const deleteMessage = (id) => {
    //     return API.delete("messages", id).then(getMessages);
    // };

    // useEffect(() => {
    //     getMessages();
    // }, []);

    // handleSubmit = () =>
    useEffect(() => {
        getActiveMessages();
    }, [activeUserId]);

    return (
        <>
            <div className="messageList">
                <div className="messageList__body">
                    <h1 className="messageList__header">Messages</h1>
                    <div className="messageList__feed">
                        {userMessages.map((message) => (
                            <MessageCard
                                key={message?.id}
                                text={message?.text}
                                userFrom={message?.user}
                                // Message={message.Message}
                                // addMessage={addMessage}
                                // deleteMessage={deleteMessage}
                                // messageId={message.id}
                            />
                        ))}
                    </div>
                </div>
                <div className="messageList__input">
                    <form
                        className="messageList__input-box"
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <input
                                type="text"
                                id="messageList__text"
                                className="messageList__text"
                                // placeholder="Email address"
                                required
                                autoFocus
                                value={messageText}
                                onChange={handleInputChange}
                            />
                        </fieldset>
                        <fieldset>
                            <button type="submit">Send</button>
                        </fieldset>
                    </form>

                    <input
                        type="text"
                        className="messageList__input-box"
                        // onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
};
