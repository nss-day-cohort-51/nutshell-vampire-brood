import React from 'react'
import { useHistory, useParams } from 'react-router'
import APIManager from '../../modules/APIManager';

export const TaskEditForm = () => {

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager();
    const [task, setTask] = useState({
    name: "",
    userId: 0,
    description: "",
    dueDate: 0,
    completeDate: 0,
    completeStatus: false
});

const [isLoading, setIsLoading] = useState(false);
const {taskId} = useParams();
const history = useHistory();

const handleFieldChange = event => {
    const stateToChange = { ...task };
    stateToChange[event.target.id] = event.target.value;
    setTask(stateToChange);
}

const updateExistingTask = event => {
    event.preventDefault();
    setIsLoading(true);
    
    //This is an edit, we need the id
    const editedTask = {
        id: taskId,
        name: task.name,
        userId: currentUserId,
        description: task.description,
        dueDate: task.dueDate,
        completeDate: Date.now(),
        completeStatus: true
    };
    
}

useEffect(() => {
    API.getById("tasks", taskId).then(task => {
        setTask(task);
        setIsLoading(false);
    });
}, []);
    
    return (
        <>
       <form>
            <fieldset>
                <div className="form-group task__name">
                      <label htmlFor="name">Current title: {task.name}</label>
                      <input type="text" id="name" onChange={updateExistingTask} required autoFocus className="form-control" placeholder="new title" value={task.name} />
                  </div>
            </fieldset>
            <fieldset>
                  <div className="form-group task__dueDate">
                      <label htmlFor="dueDate">Due Date:</label>
                      <input type="date" id="dueDate" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Task due date" value={task.dueDate} />
                  </div>
              </fieldset>
        </form>     
        </>
    )
}
