import React from "react"
import { Route } from "react-router-dom"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { TaskForm } from "./tasks/TaskForm"
import { TaskList } from "./tasks/TaskList"
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

      <Route exact path="/events">
        <EventList />
        {/* Render the component for the user's events */}
      </Route>

      <Route exact path="/events/create">
        <EventForm />
      </Route>

      <Route exact path="/tasks">
        {/* Render the component for the user's tasks */}
        <TaskList />
      </Route>

      <Route path="/tasks/create">
        <TaskForm />
      </Route>

      <Route exact path="/tasks/:taskId(\d+)/edit">
        <TaskEditForm />
      </Route>
      
    </>
  )
};