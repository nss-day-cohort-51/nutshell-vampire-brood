import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";


export const TaskForm = () => {
const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

  const [task, setTask] = useState({
    name: "",
    userId: currentUserId,
    description: "",
    dueDate: 0,
    completeStatus: false
  });

  const history = useHistory();
  const API = new APIManager()

  const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
		always create a copy, make changes, and then set state.*/
    const newTask = { ...task };
    let selectedVal = event.target.value;

    // forms always provide values as strings. But we want to save the ids as numbers.
    if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
    }

    // set the property to the new value 
    newTask[event.target.id] = selectedVal;

    // update state
    setTask(newTask);
  };
  
  const handleClickSaveTask = event => {
      event.preventDefault();

    //   Invoke addEntry passing task an argument
    //   Once complete, change the URL and display the Task List
    API.addEntry("tasks", task).then(() => history.push("/tasks"))

  }

  return (
      <div>
          <form className="task task__form">
              <h2 className="form-title">New Task</h2>
              <fieldset>
                  <div className="form-group task__name">
                      <label for="name">Title:</label>
                      <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title of task" value={task.name} />
                  </div>
              </fieldset>
              <fieldset>
                  <div className="form-group task__dueDate">
                      <label for="dueDate">Due Date:</label>
                      <input type="date" id="dueDate" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Task due date" value={task.dueDate} />
                  </div>
              </fieldset>
              <fieldset>
                  <div className="form-group task__user">
                      <label for="user">Owner:</label>
                      <input type="hidden" id="user" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="owner of task" value={task.userId} />
                  </div>
              </fieldset>
              <fieldset>
                  <div className="form-group task__description">
                      <label for="description">description:</label>
                      <textarea required name="description" id="description" cols="30" rows="10" placeholder="Describe the task" value={task.description} onChange={handleControlledInputChange}></textarea>
                  </div>
              </fieldset>

              <section className="task-edit-delete__block">
                    <button onClick={handleClickSaveTask} className="save__button">Save Task</button>
                    <Link to="/tasks">
                    <button className="cancel__button">Cancel</button>
                    </Link>
              </section>
              

          </form>
      </div>
  )
};
