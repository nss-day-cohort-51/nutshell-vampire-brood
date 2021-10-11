import React from "react";
import { UserCard } from "./UserCard";
import { useState, useEffect } from "react";
// import APIManager from "../../modules/APIManager";
import { SearchBar } from "./../tools/SearchBar.js";
import "./Users.css";

export const UserSearch = ({ addFriend, deleteFriend, friendList }) => {
    // const API = new APIManager();

    const [friendIds, setFriendIds] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState("");

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    const getFriends = () => {
        fetch(
            `http://localhost:8088/friends?currentUserId=${currentUserId}&_expand=user`
        )
            .then((result) => result.json())
            .then((friendObjs) =>
                setFriendIds(friendObjs.map((friend) => friend.userId))
            );
    };
    useEffect(() => {
        getFriends();
    }, [friendList]);

    const userSearch = () => {
        return fetch(`http://localhost:8088/users?q=${searchParams}`)
            .then((res) => res.json())
            .then((userObjs) => setUsers(userObjs));
    };

    const onChangeHandler = (value) => {
        setSearchParams(value);
    };

    useEffect(() => {
        userSearch(searchParams);
    }, []);

    return (
        <div className="userSearch">
            <h2 className="userSearch--header">Search Users</h2>
            <div className="userSearch__searchBar">
                <SearchBar
                    onSubmitHandler={() => userSearch(searchParams)}
                    onChangeHandler={onChangeHandler}
                />
            </div>

            <div className="userSearch--searchBar"></div>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    addFriend={addFriend}
                    friendIds={friendIds}
                    // isFriend={friendIds}
                    deleteFriend={deleteFriend}
                />
            ))}
        </div>
    );
};
