import { useHistory, useParams } from "react-router";
import "./Task.css";
import APIManager from "../../modules/APIManager";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export const TaskCard = ({ task, handleDeleteTask, user, handleCompleteTask }) => {

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    const {taskId} = useParams();
    const history = useHistory();

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager()

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
                      <input type="checkbox" name="taskComplete" id="taskComplete" onChange={() => handleCompleteTask(task)} />
                        <label for="task__dueDate">Completed: </label>
                           
                    </fieldset>Completed: {task.completeStatus ? `Yes` : `No`}</div>
              </section>
              <section className="task__card-body">
                  <div className="task__user">Owner: {user.name}</div>
                  <div className="task__due-date">{convertDateString(task.dueDate)}</div>
                  <p className="task__description">{task.description}</p>
              </section>
              <section className="task__card-footer">
                  <div className="task__edit-delete-button-block">
                  <button type="button" className="button__edit" onClick={() => history.push(`/tasks/${task.id}/edit`)}>
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
