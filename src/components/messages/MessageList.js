import React from "react";
import { RT } from "../tools/HelperFunctions";
import { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { MessageCard } from "./MessageCard";
import "./messages.css";
import { useRef } from "react";
import { MessageComp } from "./MessageComp";

export const MessageList = ({ activeUserId }) => {
    const [userMessages, setUserMessages] = useState([]);
    const [messageText, setMessageText] = useState([]);

    // const [messagesEnd, setMessagesEnd] = useState ;
    let messagesEnd = useRef();

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));
    const API = new APIManager();

    const getActiveMessages = () => {
        if (activeUserId == 0) {
            return fetch(
                `http://localhost:8088/messages?userToId=0&_expand=user`
            )
                .then((result) => result.json())
                .then((messageObjs) => {
                    setUserMessages(messageObjs);
                });
        } else {
            // fetch messages that are to/from you and to/from activeUser
            return fetch(
                `http://localhost:8088/messages?userToId=${currentUserId}&userToId=${activeUserId}&userId=${activeUserId}&userId=${currentUserId}&_expand=user`
            )
                .then((result) => result.json())
                .then((messageObjs) => {
                    // filter for only messages that are [you -> them] or vice versa
                    const filteredMessages = messageObjs.filter((msg) => {
                        let isFromYou =
                            msg.user.id == currentUserId &&
                            msg.userToId == activeUserId;
                        let isToYou =
                            msg.userToId == currentUserId &&
                            msg.user.id == activeUserId;
                        return isToYou || isFromYou;
                    });
                    setUserMessages(filteredMessages);
                });
        }
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
        postMessage(messageText).then(() => setMessageText(""));
    };

    useEffect(() => {
        getActiveMessages();
    }, [activeUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [userMessages]);

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="messageList">
                <div className="messageList__body">
                    <h1 className="messageList__header">Messages</h1>
                    <div className="messageList__feed">
                        {userMessages.map((message) => (
                            // <MessageCard
                            //     key={message?.id}
                            //     text={message?.text}
                            //     userFrom={message?.user}
                            //     messageId={message?.id}
                            //     message={message}
                            //     refreshMessages={getActiveMessages}
                            // />
                            <MessageComp
                                key={message?.id}
                                text={message?.text}
                                userFrom={
                                    message.user?.id !== currentUserId &&
                                    message?.user
                                }
                                username={message?.user?.name}
                            />
                        ))}
                        <div
                            style={{ float: "left", clear: "both" }}
                            ref={(el) => {
                                messagesEnd = el;
                            }}
                        ></div>
                    </div>
                </div>
                <div className="messageList__input">
                    <form
                        className="messageList__input-box"
                        onSubmit={(event) => {
                            handleSubmit(event);
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
                            <button type="submit">Send</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
};
