import React from 'react'
import { useHistory, useParams } from 'react-router'
import APIManager from '../../modules/APIManager';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const TaskEditForm = () => {

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager();
    const [task, setTask] = useState({
    name: "",
    userId: 0,
    description: "",
    dueDate: 0,
    completeStatus: false
});

const {taskId} = useParams();
const history = useHistory();

const handleFieldChange = event => {
    const stateToChange = { ...task };
    stateToChange[event.target.id] = event.target.value;
    setTask(stateToChange);
}

const updateExistingTask = event => {
    event.preventDefault();
    
    //This is an edit, we need the id
    const editedTask = {
        id: taskId,
        name: task.name,
        userId: task.userId,
        description: task.description,
        dueDate: task.dueDate,
        completeStatus: task.completeStatus
    };

    API.updateEntry("tasks", editedTask).then( () => history.push("/tasks"))
    
}

useEffect(() => {
    console.log(taskId)
    API.getById("tasks", taskId).then(task => {
        setTask(task);
    }
    );
}, []);
    
    return (
        <><hr/>
       <form>
            <fieldset>
                <div className="form-group task__name">
                      <label for="name">Chanage Task Title: {task.name}</label>
                      <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="New title" value={task.name} />
                  </div>
            </fieldset>
            <fieldset>
                  <div className="form-group task__dueDate">
                      <label for="dueDate">Change Due Date: {task.dueDate}</label>
                      <input type="date" id="dueDate" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="New due date" value={task.dueDate} />
                  </div>
              </fieldset>
              <div className="form-group task__user">
                      <input type="hidden" id="user" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="owner of task" value={task.userId} />
                  </div>
                <fieldset>
                  <div className="form-group task__description">
                      <p>{task.description}</p>
                      <textarea hidden name="description" id="description" cols="30" rows="10" placeholder="Describe the task" value={task.description} onChange={handleFieldChange}></textarea>
                  </div>
              </fieldset>
              <section className="task-edit-delete__block">
                    <button onClick={updateExistingTask} className="save__button">Save Changes</button>
                    <Link to="/tasks">
                    <button className="cancel__button">Cancel</button>
                    </Link>
              </section>
        </form>     
        </>
    )
}
