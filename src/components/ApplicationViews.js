import React from "react"
import { Route } from "react-router-dom"
import { TaskDetail } from "./tasks/TaskDetail"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { TaskForm } from "./tasks/TaskForm"
import { TaskList } from "./tasks/TaskList"

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        {/* Render the component for news articles */}
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
      <Route exact path="/tasks/:taskId(\d+)">
        <TaskDetail />
      </Route>
      <Route path="/tasks/create">
        <TaskForm />
      </Route>
      <Route exact path="/tasks/:taskId(\d+)/edit">
        <TaskEditForm />
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
