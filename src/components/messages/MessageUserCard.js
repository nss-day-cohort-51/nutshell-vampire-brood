import React from "react";
import { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";

export const MessageUserCard = ({ userFrom, setActiveUserId }) => {
    const API = new APIManager();
    const [userName, setUserName] = useState();

    useEffect(() => {
        getUserName();
    }, []);

    const getUserName = () => {
        return API.getById("users", userFrom).then((user) => {
            setUserName(user.name);
        });
    };

    return (
        <div
            onClick={() => setActiveUserId(userFrom)}
            className="messageUserCard"
        >
            <div className="messageUserCard__user">{userName}</div>
        </div>
    );
};
