import React from "react";
import { MessageList } from "./MessageList";
// import APIManager from "../../modules/APIManager";
import { useState, useEffect } from "react";
import { MessageUserCard } from "./MessageUserCard";
import { useParams } from "react-router";

export const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [totalActiveUsers, setTotalActiveUsers] = useState([]);

    let { userId } = useParams();
    userId = parseInt(userId);
    const [activeUserId, setActiveUserId] = useState(userId || 0);

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));
    // const API = new APIManager();

    const getTotalActiveUsers = () => {
        fetch(
            `http://localhost:8088/messages?userToId=${currentUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((messageObjs) => {
                let activeUsersArray = userId ? [userId] : [];
                messageObjs.forEach((messageObj) => {
                    if (!activeUsersArray.includes(messageObj.userId)) {
                        activeUsersArray.push(messageObj.userId);
                    }
                });
                setTotalActiveUsers(activeUsersArray);
            });
    };

    const getActiveMessages = () => {
        fetch(
            `http://localhost:8088/messages?userToId=${currentUserId}&userId=${activeUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((messageObjs) => {
                setMessages(messageObjs);
            });
    };

    useEffect(() => {
        getActiveMessages();
        getTotalActiveUsers();
    }, []);

    return (
        <div className="messages">
            <div className="messages__sideBar">
                {totalActiveUsers.map((userId) => (
                    <MessageUserCard
                        key={userId}
                        userFrom={userId}
                        activeUserId={activeUserId}
                        setActiveUserId={setActiveUserId}
                        currentUserId={currentUserId}
                    />
                ))}
            </div>
            <div className="messages__feed">
                <MessageList activeUserId={activeUserId} />
            </div>
        </div>
    );
};
