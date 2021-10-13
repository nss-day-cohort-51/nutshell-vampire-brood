import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import "./Event.css";
import { useParams, useHistory } from "react-router-dom";
import { useRadioGroup } from "@mui/material";
import { RT } from "../tools/HelperFunctions";

const apiEventReturn = new APIManager();
const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

export const EventDetail = () => {
    const [event, setEvent] = useState({
        user: 0,
        name: "",
        location: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const { eventId } = useParams();
    const history = useHistory();

    const handleDeleteEvent = (id) => {
        apiEventReturn.delete("events", id);
        history.push("/events");
    };

    const handleBack = () => {
        history.push("/events");
    };

    useEffect(() => {
        apiEventReturn.getById("events", eventId).then((event) => {
            setEvent({
                user: event.userId,
                name: event.name,
                location: event.location,
                address: event.address,
                city: event.city,
                state: event.state,
                zip: event.zip,
            });
            setIsLoading(false);
        });
        setIsLoading(false);
    }, [eventId]);

    return (
        <section className="event">
            <div className="event__details__">
                <h3 className="event__name">
                    {" "}
                    <strong> Name: {RT(event.name)} </strong>
                </h3>

                <div className="event__details">
                    {" "}
                    <strong> Venue: </strong> {RT(event.location)}{" "}
                </div>

                <div className="event__details">
                    {" "}
                    <strong> Address: </strong> {RT(event.address)}{" "}
                </div>

                <div className="event__details">
                    {" "}
                    <strong> {RT("City")}: </strong> {RT(event.city)}{" "}
                </div>

                <div className="event__details">
                    {" "}
                    <strong> State: </strong> {RT(event.state)}{" "}
                </div>

                <div className="event__details">
                    {" "}
                    <strong> Zip: </strong> {RT(event.zip)}{" "}
                </div>

                {event.user === currentUser ? (
                    <button
                        className="event__deleteButton"
                        type="button"
                        disabled={isLoading}
                        onClick={handleDeleteEvent}
                    >
                        {" "}
                        Remove Occasion{" "}
                    </button>
                ) : (
                    <button
                        className="event__"
                        type="button"
                        className="event__deleteButton"
                        disabled={isLoading}
                        onClick={() =>
                            alert("Not allowed to deleted this Event")
                        }
                    >
                        {" "}
                        Remove Occasion{" "}
                    </button>
                )}

                {event.user === currentUser ? (
                    <button
                        type="button"
                        className="event__editButton"
                        onClick={() => history.push(`/events/${eventId}/edit`)}
                    >
                        {" "}
                        {RT("Edit")}{" "}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="event__editButton"
                        onClick={() => alert("Not allowed to edit this Event")}
                    >
                        {" "}
                        Edit{" "}
                    </button>
                )}

                <button
                    type="button"
                    className="event__goBack"
                    onClick={handleBack}
                >
                    {" "}
                    Go Back{" "}
                </button>
            </div>
        </section>
    );
};
