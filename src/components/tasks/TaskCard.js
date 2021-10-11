import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./Task.css";
import APIManager from "../../modules/APIManager";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export const TaskCard = ({ task, handleDeleteTask, user }) => {

    const [completeTask, setCompleteTask] = useState({
      completeDate: 0,
      completeStatus: false
    })
    const [isLoading, setIsLoading] = useState(false);
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    const {taskId} = useParams();

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager()

    const convertDateString = (date) => {
        const dateString = new Date(date);
        const formattedDate = dateString.toDateString()
        return formattedDate;
    }

    const handleFieldChange = event => {
        console.log("Buckets of chicken!")
        setCompleteTask({
            ...completeTask,
            [event.target.name]: event.target.checked,
          });
          handleCompleteTask();
    }

    const handleCompleteTask = () => {
        setIsLoading(true)

        // Declare the editted state of the task
        const editedTask = {
            id: taskId,
            userId: currentUserId,
            description: task.description,
            dueDate: task.dueDate,
            completeDate: Date.now(),
            completeStatus: true
        }

        API.updateEntry("tasks", editedTask);
    }
  
  return (
    <>
    <section className="task">
          <div className="task__card">
              <section className="task__card-header">
                  <h3 className="task__name">{task.name}</h3>
                  <div className="task__completed-status">
                      <fieldset>
                      <input type="checkbox" name="taskComplete" id="taskComplete" onChange={handleCompleteTask} />
                        <label for="task__dueDate">Completed: </label>
                           
                    </fieldset>Completed: {task.completeStatus ? `Yes` : `No`}</div>
              </section>
              <section className="task__card-body">
                  <div className="task__user">Owner: {user.name}</div>
                  <div className="task__due-date">{convertDateString(task.dueDate)}</div>
                  <p className="task__description">{task.description}</p>
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
