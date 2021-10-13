import React from "react";
import { RT } from "../tools/HelperFunctions";
import { Link, useHistory } from "react-router-dom";
import "./Event.css";
import { dateTimeFormatter } from "../../tools/dateTimeHelper";

const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

export const EventCard = ({ event, index, handleDeleteEvent }) => {
    const eventStart = dateTimeFormatter(event.dateStart);
    const eventEnd = dateTimeFormatter(event.dateEnd);
    const history = useHistory();

    const handleMoreDetails = () => {
        history.push("/events/" + event.id + "/");
    };

    const eventCardContent =
        index === 0 ? (
            //Event is the next in line
            //Will be styled individually different from the rest of the Event cards
            <section className="eventCardFirst">
                <h3 className="eventCardFirst__name">
                    <Link to={`/events/${event.id}`}> {RT(event.name)}</Link>
                </h3>

                <div className="eventCardFirst__startDate">
                    Beginning: {RT(eventStart)}
                </div>

                {eventEnd ? (
                    <div className="eventCardFirst__endDate">
                        {" "}
                        Ending: {RT(eventEnd)}{" "}
                    </div>
                ) : (
                    <div className="eventCardFirst__endDate">
                        {" "}
                        Ending: No ending available{" "}
                    </div>
                )}

                {event.location ? (
                    <div className="eventCardFirst__location">
                        {" "}
                        Place: {RT(event.location)}{" "}
                    </div>
                ) : (
                    <div className="eventCardFirst__location">
                        {" "}
                        Place: Everywhere{" "}
                    </div>
                )}

                <button
                    className="event__detailsButton"
                    type="button"
                    onClick={handleMoreDetails}
                >
                    {" "}
                    {RT("More Details")}{" "}
                </button>

                {currentUser === event.userId ? (
                    <div>
                        {" "}
                        <button
                            type="button"
                            className="event__deleteButton"
                            onClick={() => {
                                handleDeleteEvent(event.id);
                            }}
                        >
                            {" "}
                            Remove Occasion{" "}
                        </button>{" "}
                    </div>
                ) : (
                    <div>
                        {" "}
                        <button
                            type="button"
                            className="event__deleteButton"
                            onClick={() =>
                                alert("Not allowed to delete this Event")
                            }
                        >
                            {" "}
                            Remove Occasion{" "}
                        </button>{" "}
                    </div>
                )}
            </section>
        ) : (
            //Event is not next in line
            //will be styled the same as the rest of Event cards
            <section className="eventCard">
                <h3 className="eventCard__name">
                    <Link to={`/events/${event.id}`}> {RT(event.name)}</Link>
                </h3>

                <div className="eventCard__startDate">
                    Beginning: {RT(eventStart)}
                </div>

                {eventEnd ? (
                    <div className="eventCard__endDate">
                        {" "}
                        Ending: {RT(eventEnd)}{" "}
                    </div>
                ) : (
                    <div className="eventCard__endDate">
                        {" "}
                        Ending: No ending available{" "}
                    </div>
                )}

                {event.location ? (
                    <div className="eventCard__location">
                        {" "}
                        Place: {RT(event.location)}{" "}
                    </div>
                ) : (
                    <div className="eventCard__location">
                        {" "}
                        Place: Everywhere{" "}
                    </div>
                )}

                <button
                    className="event__detailsButton"
                    type="button"
                    onClick={handleMoreDetails}
                >
                    {" "}
                    {RT("More Details")}{" "}
                </button>

                {currentUser === event.userId ? (
                    <div>
                        {" "}
                        <button
                            type="button"
                            className="event__deleteButton"
                            onClick={() => {
                                handleDeleteEvent(event.id);
                            }}
                        >
                            {" "}
                            Remove Occasion{" "}
                        </button>{" "}
                    </div>
                ) : (
                    <div>
                        <button
                            type="button"
                            className="event__deleteButton"
                            onClick={() =>
                                alert("Not allowed to delete this Event")
                            }
                        >
                            {" "}
                            Remove Occasion{" "}
                        </button>{" "}
                    </div>
                )}
            </section>
        );

    //We will return the proper Event Card here based on the Index value above
    //Index === 0, we get the fancy Event Card
    //Else we get the standard format Event Card
    return eventCardContent;
};
