import React from "react";
import { Route } from "react-router-dom";
import { UserList } from "./users/UserList";
import { Messages } from "./messages/Messages";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                {/* Render the component for news articles */}
            </Route>
            <Route path="/friends">
                <UserList />
                {/* Render the component for list of friends */}
            </Route>
            <Route path="/messages">
                <Messages />
                {/* Render the component for the messages */}
            </Route>
            <Route path="/messages/:userId(/d+)">
                <Messages />
                {/* Render the component for the messages */}
            </Route>
            <Route path="/tasks">
                {/* Render the component for the user's tasks */}
            </Route>
            <Route path="/events">
                {/* Render the component for the user's events */}
            </Route>
        </>
    );
};
