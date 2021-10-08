import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import APIManager from "../../modules/APIManager";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  //the initial state of is an empty array
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
const API = new APIManager()

const getTasks = () => {

    // After the data comes back from the API, use it in setTasks function to change the state
    return API.getAllByUserId("tasks", currentUserId, ["user"]).then((tasksFromAPI) => {
      setTasks(tasksFromAPI);
    });
  };

  const handleDeleteTask = (id) => {
    API.delete("tasks", id).then(() =>
      API.getAllByUserId("tasks", currentUserId, ["user"]).then(setTasks)
    );
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
    <section className="new-task-button__block">
        <button type="button"
            className="btn"
            onClick={() => {history.push("/tasks/create")}}>
            New Task
        </button>
      </section>
      <div className="task__container">
        {tasks.map(task => <TaskCard key={task.id} task={task} user={task.user} handleDeleteTask={handleDeleteTask} />)}
      </div>
    </>
  );
};
