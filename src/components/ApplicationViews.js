import React from "react"
import { Route } from "react-router-dom"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { TaskForm } from "./tasks/TaskForm"
import { TaskList } from "./tasks/TaskList"
import { ArticleList } from "../components/articles/ArticleList";
import { ArticleForm } from "../components/articles/ArticleForm";
import { EventList } from "./events/EventList"
import { EventForm } from "./events/EventForm"
import { EventDetail } from "./events/EventDetail"
import { ArticleEditForm } from "../components/articles/ArticleEditForm";

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
        {/* Render the component for list of friends */}
      </Route>
      <Route path="/messages">
        {/* Render the component for the messages */}
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
      <Route exact path="/events">
        <EventList />
      </Route>
      <Route exact path="/events/:eventId(\d+)">
        <EventDetail />
      </Route>
      <Route exact path="/events/create">
        <EventForm />
      </Route>
    </>
  );
};
