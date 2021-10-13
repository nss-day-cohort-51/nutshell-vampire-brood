import React from "react";
import { RT } from "../tools/HelperFunctions";
import { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { AddUserIcon } from "../tools/AddUserIcon";

export const MessageUserCard = ({
    userFrom,
    setActiveUserId,
    activeUserId,
    currentUserId,
}) => {
    const API = new APIManager();
    const [userName, setUserName] = useState();
    const [isFriend, setIsFriend] = useState();

    const getUserName = () => {
        return API.getById("users", userFrom).then((user) => {
            setUserName(user.name);
        });
    };

    const getIsFriend = () => {
        return fetch(
            `http://localhost:8088/friends?userId=${userFrom}&currentUserId=${currentUserId}`
        )
            .then((res) => res.json())
            .then((res) => {
                setIsFriend(res.length > 0);
            });
    };

    useEffect(() => {
        getUserName();
    }, []);

    useEffect(() => {
        getIsFriend();
    }, []);

    return (
        <div
            onClick={() => setActiveUserId(userFrom)}
            className={
                activeUserId == userFrom
                    ? "messageUserCard active"
                    : "messageUserCard"
            }
        >
            <div className="messageUserCard__user">{RT(userName)}</div>
            {isFriend ? null : (
                <AddUserIcon userId={userFrom} handleClick={getIsFriend} />
            )}
        </div>
    );
};
