import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import APIManager from "../../modules/APIManager"

const apiEventEditor = new APIManager





export const EventEditForm = () => {
    const [thisEvent, setEvent] = useState({ name: "", location: "", dateStart: "", dateEnd: "", address: "", city: "", state: "", zip: "" });
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
            zip: thisEvent.zip
        };

        apiEventEditor.updateEntry(editedEvent)
            .then(() => history.push("/event")
            )
    }

    useEffect(() => {
        apiEventEditor.getById(eventId)
            .then(thisEvent => {
                setEvent(thisEvent);
                setIsLoading(false);
            });
    }, []);



    



    return (
        <>
            <form>
                <fieldset>
                    <div className="formgrid">

                        {/* INPUT FIELD TO MODIFY EVENT NAME */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.name}
                        />
                        <label htmlFor="name">Name of Occurrence</label>

                        {/* INPUT FIELD TO MODIFY EVENT LOCATION */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.location}
                        />
                        <label htmlFor="name">Place of Occurence</label>

                        {/* INPUT FIELD TO MODIFY EVENT START DATE */}
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.dateStart}
                        />
                        <label htmlFor="name">Beginning of Occurrence</label>

                        {/* INPUT FIELD TO MODIFY EVENT END DATE */}
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.dateEnd}
                        />
                        <label htmlFor="name">End of Occurrence</label>

                        {/* INPUT FIELD TO MODIFY EVENT ADDRESS */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.address}
                        />
                        <label htmlFor="name">Address</label>

                        {/* INPUT FIELD TO MODIFY EVENT CITY */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.city}
                        />
                        <label htmlFor="name">City</label>

                        {/* INPUT FIELD TO MODIFY EVENT STATE */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.state}
                        />
                        <label htmlFor="name">State</label>

                        {/* INPUT FIELD TO MODIFY EVENT ZIP */}
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={handleFieldChange}
                            id="name"
                            value={thisEvent.zip}
                        />
                        <label htmlFor="name">Zip</label>
                    </div>


                    <div className="alignRight">
                        <button
                            type="button" disabled={isLoading}
                            onClick={updateExistingEvent}
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </fieldset>
            </form>
        </>
    );
}