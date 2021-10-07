import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import APIManager from "../../modules/APIManager";

export const TaskDetail = () => {

    const [task, setTask] = useState({name: "", description: "", dueDate: 0, completeDate: 0, completeStatus: false, user: "" })
    const [isLoading, setIsLoading] = useState(true);

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager()

    const {taskId} = useParams();
    const history = useHistory();

    const convertDateString = (date) => {
        const dateString = new Date(date);
        const formattedDate = dateString.toDateString()
        return formattedDate;
    }

    const getTask = () => {
      debugger
      return API.getById("tasks", taskId, ["user"]).then(task => {
         
        setTask({
            name: task.name,
            description: task.description,
            dueDate: convertDateString(task.dueDate),
            completeDate: convertDateString(task.completeDate),
            completeStatus: task.completeStatus,
            user: task.user.name
        });
        setIsLoading(false)
    });
      
    }

    const handleDeleteTask = () => {

        setIsLoading(true);
        API.delete("tasks", taskId).then(() => history.push("/tasks"))
      };

    useEffect(() => {
      getTask();
    }, []);

    return (
        <section className="task">
      <div className="task__card">
        <section className="task__card-header">
          <h3 className="task__name">{task.name}</h3>
        </section>
        <hr />
        <section className="task__card-body">
          <div className="task__user">Owner: {task.user}</div>
          <div className="task__due-date">{task.dueDate}</div>
          <div className="task__completion-status">{task.complete}</div>
          <p className="task__description">{task.description}</p>
        </section>
        <section className="task__card-footer">
          <div className="task__edit-delete-button-block">
            <button type="button" className="button__save">
              Save
            </button>
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
    )
}
