import React from "react";
import { Route } from "react-router-dom";
import { UserList } from "./users/UserList";
import { ArticleList } from "../components/articles/ArticleList";
import { ArticleForm } from "../components/articles/ArticleForm";
import { ArticleEditForm } from "../components/articles/ArticleEditForm";
//import { MessageCard } from "./messages/MessageCard";
import { Messages } from "./messages/Messages";
import { EventList } from "./events/EventList";
import { EventDetail } from "./events/EventDetail";
import { EventForm } from "./events/EventForm";
import { EventEditForm } from "./events/EventEditForm";


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <ArticleList />
      </Route>
      <Route exact path="/articles/create">
        <ArticleForm />
      </Route>
      <Route exact path="/articles/:articleId(\d+)/edit">
        <ArticleEditForm />
      </Route>
      <Route path="/friends">
        <UserList />
        {/* Render the component for list of friends */}
      </Route>
      <Route exact path="/messages">
        <Messages />
        {/* Render the component for the messages */}
      </Route>
      <Route path="/messages/:userId(\d+)/">
        <Messages />
        {/* Render the component for the messages */}
      </Route>
      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
      </Route>
      <Route exact path="/events">
        <EventList />
      </Route>
      <Route exact path="/events/:eventId(\d+)">
        <EventDetail />
      </Route>
      <Route exact path="/events/create">
        <EventForm />
      </Route>
      <Route exact path="/events/:eventId(\d+)/edit">
        <EventEditForm />
      </Route>
    </>
  )
};