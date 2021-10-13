import React from "react";
import { RT } from "../tools/HelperFunctions";
import { MessageList } from "./MessageList";
// import APIManager from "../../modules/APIManager";
import { useState, useEffect } from "react";
import { MessageUserCard } from "./MessageUserCard";
import { useParams } from "react-router";

export const Messages = () => {
    const [totalActiveUsers, setTotalActiveUsers] = useState([]);

    let { userId } = useParams();
    userId = parseInt(userId);
    const [activeUserId, setActiveUserId] = useState(userId || 0);

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    // find any users who you have sent pr received messages from
    const getTotalActiveUsers = () => {
        fetch(
            `http://localhost:8088/messages?userToId=${currentUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((messageObjs) => {
                // if directed here route param id -> make sure the user displays as active
                let activeUsersArray = userId ? [userId] : [];
                // check entire usar message history and add all unique sender/reciever userIds
                messageObjs.forEach((messageObj) => {
                    if (!activeUsersArray.includes(messageObj.userId)) {
                        activeUsersArray.push(messageObj.userId);
                    }
                });
                setTotalActiveUsers(activeUsersArray);
            });
    };

    useEffect(() => {
        getTotalActiveUsers();
    }, []);

    return (
        <div className="messages">
            <div className="messages__sideBar">
                <div
                    onClick={() => setActiveUserId(0)}
                    className={
                        activeUserId == 0
                            ? "messageUserCard active"
                            : "messageUserCard"
                    }
                >
                    <div className="messageUserCard__user"> Public Chat </div>
                </div>
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
