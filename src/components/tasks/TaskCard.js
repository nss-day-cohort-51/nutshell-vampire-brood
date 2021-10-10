import React from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import "./Task.css";

export const TaskCard = ({ task, handleDeleteTask, user }) => {
    
    const convertDateString = (date) => {
        const dateString = new Date(date);
        const formattedDate = dateString.toDateString()
        return formattedDate;
    }
  
  return (
    <>
    <section className="task">
          <div className="task__card">
              <section className="task__card-header">
                  <h3 className="task__name">{task.name}</h3>
                  <div className="task__completed-status">
                      <fieldset>
                            <div className="form-group task__description">
                            <label for="task__dueDate">Completed: </label>
                                <input type="checkbox" id="task__dueDate" name="task__dueDate" />
                            </div>
                    </fieldset>Completed: {task.completeStatus ? `Yes` : `No`}</div>
              </section>
              <section className="task__card-body">
                  <div className="task__user">Owner: {user.name}</div>
                  <div className="task__due-date">{convertDateString(task.dueDate)}</div>
              </section>
              <section className="task__card-footer">
                  <div className="task__details-button">
                      <Link to={`/tasks/${task.id}`}>
                          <button type="button" className="task__details">Details</button>
                      </Link>
                  </div>
                  <div className="task__edit-delete-button-block">
                      <button type="button" className="button__edit">
                          Edit
                      </button>
                      <button type="button" className="button__delete" onClick={() => handleDeleteTask(task.id)}>
                          Delete
                      </button>
                  </div>
              </section>
          </div>
      </section>
      <hr />
      </>
  );
};
