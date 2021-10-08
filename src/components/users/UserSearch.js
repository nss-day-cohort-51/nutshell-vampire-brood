import React from "react";
import { UserCard } from "./UserCard";
import { useState, useEffect } from "react";
// import APIManager from "../../modules/APIManager";
import { SearchBar } from "./../tools/SearchBar.js";
import "./Users.css";

export const UserSearch = ({ addFriend, deleteFriend }) => {
    // const API = new APIManager();

    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useState("");

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
                    isFriend={false}
                    deleteFriend={deleteFriend}
                />
            ))}
        </div>
    );
};
