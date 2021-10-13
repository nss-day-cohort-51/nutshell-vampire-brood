import React, { useState, useEffect } from "react";
import { RT } from "../tools/HelperFunctions";
import { EventCard } from "./EventCard";
import { useHistory } from "react-router-dom";
import APIManager from "../../modules/APIManager";
const apiListReturn = new APIManager();

export const EventList = () => {
    // The initial state is an empty array
    const [events, setEvents] = useState([]);

    const getEvents = () => {
        fetch("http://localhost:8088/events?_sort=date&order=desc&_expand=user")
            .then((response) => response.json())
            .then((apiListReturn) => {
                setEvents(apiListReturn);
            });
    };

    const history = useHistory();

    const handleDeleteEvent = (id) => {
        apiListReturn.delete("events", id).then(() => getEvents());
    };

    // get the events from the API on the component's first render
    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            {/* add a button to create a new Event */}
            <section className="event__section__content">
                <button
                    type="button"
                    className="event__createButton"
                    onClick={() => {
                        history.push("/events/create");
                    }}
                >
                    Create New Occasion
                </button>

                {/* use .map to loop through the event cards and print them out */}
                <div className="event__cards">
                    {events.map((event, index) => (
                        <EventCard
                            index={index}
                            key={event.id}
                            event={event}
                            handleDeleteEvent={handleDeleteEvent}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};
