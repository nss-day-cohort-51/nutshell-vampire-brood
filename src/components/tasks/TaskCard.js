import React from "react";
import { useHistory } from "react-router";
import "./Task.css"

export const TaskCard = () => {
  const history = useHistory();

  return (
    <section className="task">
      <div className="task__card">
        <section className="task__card-header">
          <h3 className="task__name"></h3>
        </section>
        <section className="task__card-body">
          <div className="task__user"></div>
          <div className="task__due-date"></div>
          <div className="task__completion-status"></div>
        </section>
        <section className="task__card-footer">
          <div className="task__details-button">
            <button type="button" className="task__details"></button>
          </div>
          <div className="task__edit-delete-button-block">
            <button type="button" className="button__edit">
              Edit
            </button>
            <button type="button" className="button__delete">
              Delete
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};
