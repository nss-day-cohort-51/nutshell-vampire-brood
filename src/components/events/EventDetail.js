import React, { useState, useEffect } from 'react';
import APIManager from '../../modules/APIManager';
import './Event.css';
import { useParams, useHistory } from 'react-router-dom';
import { useRadioGroup } from '@mui/material';


const apiEventReturn = new APIManager();


const loggedInUser = sessionStorage.getItem("nutshell_user");
const editThisEvent = userId;
let allowEventEdit = false;



export const EventDetail = () => {

    const [event, setEvent] = useState({ name: "", location: "", address: "", city: "", state: "", zip: "" });
    const [isLoading, setIsLoading] = useState(true);
    const { eventId } = useParams();
    const history = useHistory();

    const handleDeleteEvent = id => {
        apiEventReturn.delete("events", id)
        history.push("/events");
    };

    const handleBack = () => {
        history.push("/events");
    }

    useEffect(() => {
        apiEventReturn.getById("events", eventId)
            .then(event => {
                setEvent({
                    name: event.name,
                    location: event.location,
                    address: event.address,
                    city: event.city,
                    state: event.state,
                    zip: event.zip
                });
                setIsLoading(false);
            });
    }, [eventId]);


    if (loggedInUser === editThisEvent) {
        allowEventEdit = true;
    }


    return (

        <div className="event__details__">

            <section className="event">

                <h3 className="event__name"> <strong> Name: </strong> {event.name}</h3>

                <div className="event__details"> <strong> Venue: </strong> {event.location}</div>

                <div className="event__details"> <strong> Address: </strong> {event.address} {event.city}, {event.state} {event.zip} </div>

                <button className="event__" type="button" disabled={isLoading} onClick={handleDeleteEvent}> Remove Occasion </button>

                {allowEventEdit === true ? <button type="button"
                    onClick={() => history.push(`/events/${event.id}/edit`)}> Edit </button> : <button type="button"
                    onClick={() => alert("Not allowed to edit this Event")}> Edit </button>}

                <button type="button" onClick={handleBack}> Go Back </button>

            </section>

        </div>
    );
}