import React from "react";
import { Route } from "react-router-dom";
import { ArticleList } from "../components/articles/ArticleList";
import { ArticleForm } from "../components/articles/ArticleForm";
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
      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  );
};
