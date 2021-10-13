import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import APIManager from "../../modules/APIManager";
import { TaskCard } from "./TaskCard";
import { RT } from "../tools/HelperFunctions";

const remoteURL = "http://localhost:8088";

export const TaskList = () => {
    //the initial state of is an empty array
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));
    const API = new APIManager();

    // The Task List should only show Tasks that are not completed, i.e. completeStatus: false
    // So, I need a fetch that looks for that key:value pair -
    // fetch call http://localhost:8088/tasks/?completeStatus=false&userId=1&_expand=user
    const fetchUncompletedTasksByUserID = () => {
        return fetch(
            `${remoteURL}/tasks/?completeStatus=false&userId=${currentUserId}&_expand=user`
        ).then((response) => response.json());
    };

    const getTasks = () => {
        // After the data comes back from the API, use it in setTasks function to change the state
        return fetchUncompletedTasksByUserID().then((tasksFromAPI) => {
            setTasks(tasksFromAPI);
        });
    };

    const handleDeleteTask = (id) => {
        API.delete("tasks", id).then(() =>
            fetchUncompletedTasksByUserID().then(setTasks)
        );
    };

    const updateCompleteTask = (taskObj) => {
        return fetch(`${remoteURL}/tasks/${taskObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObj),
        }).then((data) => data.json());
    };

    const handleCompleteTask = (taskObj) => {
        const completedTask = {
            id: taskObj.id,
            name: taskObj.name,
            userId: taskObj.userId,
            description: taskObj.description,
            dueDate: taskObj.dueDate,
            completeStatus: true,
        };

        updateCompleteTask(completedTask).then(() =>
            fetchUncompletedTasksByUserID().then(setTasks)
        );
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Button
                        onClick={() => {
                            history.push("/tasks/create");
                        }}
                        variant="contained"
                        fullWidth
                    >
                        New Task
                    </Button>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        user={task.user}
                        handleDeleteTask={handleDeleteTask}
                        handleCompleteTask={handleCompleteTask}
                    />
                ))}
            </Grid>
        </>
    );
};
