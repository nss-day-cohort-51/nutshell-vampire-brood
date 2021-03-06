import { useHistory, useParams } from "react-router";
import "./Task.css";
import APIManager from "../../modules/APIManager";
import { RT } from "../tools/HelperFunctions";
import {
    Button,
    CardActions,
    Typography,
    CardContent,
    Card,
    CardHeader,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    styled,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
}));

export const TaskCard = ({
    task,
    handleDeleteTask,
    user,
    handleCompleteTask,
}) => {
    const { taskId } = useParams();
    const history = useHistory();

    // Make a copy of the APIManager class function (or whatever it's called)
    const API = new APIManager();

    const convertDateString = (date) => {
        const dateString = new Date(date);
        const formattedDate = dateString.toDateString();
        return formattedDate;
    };

    return (
        <Grid item xs={2} sm={4} md={4} key={task.id} spacing={3}>
            <Card sx={{ minWidth: 300 }}>
                <CardHeader
                    action={
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => handleCompleteTask(task)}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            }
                            label={RT("Complete")}
                            labelPlacement="start"
                        />
                    }
                    title={RT(task.name)}
                    subheader={("Due:", RT(convertDateString(task.dueDate)))}
                />
                <CardContent>
                    <Typography variant="body2">
                        {RT(task.description)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => history.push(`/tasks/${task.id}/edit`)}
                        variant="outlined"
                    >
                        {RT("Edit")}
                    </Button>
                    <Button
                        onClick={() => handleDeleteTask(task.id)}
                        variant="contained"
                        sx={{ backgroundColor: "#767b91" }}
                    >
                        {RT("Delete")}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
