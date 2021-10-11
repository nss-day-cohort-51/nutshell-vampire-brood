import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import APIManager from "../../modules/APIManager";
import { TaskCard } from "./TaskCard";

const remoteURL = "http://localhost:8088";

export const TaskList = () => {
  //the initial state of is an empty array
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
const API = new APIManager()

// The Task List should only show Tasks that are not completed, i.e. completeStatus: false
// So, I need a fetch that looks for that key:value pair -   
// fetch call http://localhost:8088/tasks/?completeStatus=false&userId=1&_expand=user
const fetchUncompletedTasksByUserID = () => {
  return fetch(`${remoteURL}/tasks/?completeStatus=false&userId=${currentUserId}&_expand=user`).then(response => response.json())
}

const getTasks = () => {

    // After the data comes back from the API, use it in setTasks function to change the state
    return fetchUncompletedTasksByUserID().then((tasksFromAPI) => {
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
