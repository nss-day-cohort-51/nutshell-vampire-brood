import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import APIManager from "../../modules/APIManager"

const apiEventEditor = new APIManager

export const EventEditForm = () => {

    const [thisEvent, setEvent] = useState({
        name: "",
        location: "",
        dateStart: "",
        dateEnd: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const { eventId } = useParams();
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = { ...thisEvent };
        stateToChange[evt.target.id] = evt.target.value;
        setEvent(stateToChange);
    };

    const updateExistingEvent = evt => {
        evt.preventDefault()
        setIsLoading(true);

        // This is an edit, so we need the id
        const editedEvent = {
            id: eventId,
            name: thisEvent.name,
            location: thisEvent.location,
            dateStart: thisEvent.dateStart,
            dateEnd: thisEvent.dateEnd,
            address: thisEvent.address,
            city: thisEvent.city,
            state: thisEvent.state,
            zip: thisEvent.zip,
            userId: thisEvent.userId
        };

        apiEventEditor.updateEntry(editedEvent)
            .then(() => history.push("/event"))
    }

    useEffect(() => {
        apiEventEditor.getById("events", eventId)
            .then(thisEvent => {
                setEvent(thisEvent);
                setIsLoading(false);
            });
    }, []);

    const handleBack = () => {
        history.push("/events/" + eventId + "/");
    }

    return (
        <>
            <section className="event__editForm">
                <form>
                    <fieldset>
                        <div className="formgrid">

                            {/* INPUT FIELD TO MODIFY EVENT NAME */}
                            <label htmlFor="name" >Name of Occurrence</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.name}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT LOCATION */}
                            <label htmlFor="name">Place of Occurence</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.location}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT START DATE */}
                            <label htmlFor="name">Beginning of Occurrence</label>

                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.dateStart}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT END DATE */}
                            <label htmlFor="name">End of Occurrence</label>

                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.dateEnd}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT ADDRESS */}
                            <label htmlFor="name">Address</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.address}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT CITY */}
                            <label htmlFor="name">City</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.city}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT STATE */}
                            <label htmlFor="name">State</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.state}
                            />

                            {/* INPUT FIELD TO MODIFY EVENT ZIP */}
                            <label htmlFor="name">Zip</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={handleFieldChange}
                                id="name"
                                value={thisEvent.zip}
                            />

                            {/* SUBMIT BUTTON FOR AFTER EDIT IS COMPLETE */}
                            <div className="event__editSubmit__">
                                <button
                                    type="button" className="event__editSubmitButton" disabled={isLoading}
                                    onClick={updateExistingEvent}
                                >Submit</button>
                            </div>

                            <button type="button" className="event__goBack" onClick={handleBack}> Go Back </button>

                        </div>



                    </fieldset>
                </form>
            </section>
        </>
    );
}