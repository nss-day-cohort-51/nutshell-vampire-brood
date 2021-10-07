import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router";
import APIManager from "../../modules/APIManager";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  //the initial state of is an empty array
  const [tasks, setTasks] = useState([]);
//   const history = useHistory();

const API = new APIManager()

const getTasks = () => {

    // After the data comes back from the API, use it in setTasks function to change the state
    return API.getAll("tasks", ["user"]).then((tasksFromAPI) => {
      setTasks(tasksFromAPI);
    });
  };

  const handleDeleteTask = (id) => {
    API.delete("tasks", id).then(() =>
      API.getAll("tasks", ["user"]).then(setTasks)
    );
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="task__container">
        {tasks.map(task => <TaskCard key={task.id} task={task} handleDeleteTask={handleDeleteTask} />)}
      </div>
    </>
  );
};
