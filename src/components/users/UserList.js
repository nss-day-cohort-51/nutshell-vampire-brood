import React from "react";
import { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { UserCard } from "./UserCard";
import { UserSearch } from "./UserSearch";
import "./Users.css";

export const UserList = () => {
    const [friends, setFriends] = useState([]);

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const API = new APIManager();

    const getFriends = () => {
        fetch(
            `http://localhost:8088/friends?currentUserId=${currentUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((friendObjs) => setFriends(friendObjs));
    };

    const addFriend = (friendId) => {
        const friendObj = {
            userId: friendId,
            currentUserId: currentUserId,
        };
        return API.addEntry("friends", friendObj).then(getFriends);
    };

    const deleteFriend = (id) => {
        return API.delete("friends", id).then(getFriends);
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
            <div className="userList">
                <div className="userList__friends">
                    <h1 className="userList__friends">Friends</h1>
                    <div className="userList__friendList">
                        {friends.map((friend) => {
                            return (
                                <UserCard
                                    key={friend.id}
                                    user={friend.user}
                                    addFriend={addFriend}
                                    deleteFriend={deleteFriend}
                                    isFriend={true}
                                    friendId={friend.id}
                                />
                            );
                        })}
                    </div>
                </div>
                <UserSearch
                    addFriend={addFriend}
                    deleteFriend={deleteFriend}
                    friendList={friends}
                />
            </div>
        </>
    );
};
