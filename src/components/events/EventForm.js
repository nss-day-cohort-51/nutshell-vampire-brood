import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APIManager from '../../modules/APIManager';
import './Event.css'

const apiEventManager = new APIManager();
const currentUser = parseInt(sessionStorage.getItem("nutshell_user"));

export const EventForm = () => {

	// State will contain both event data as well as an isLoading flag.
	// Define the initial state of the form inputs with useState()

	const [thisEvent, setEvent] = useState({
		userId: currentUser,
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
	const history = useHistory();

	//when a field changes, update state. The return will re-render and display based on the values in state
	// NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
	//Controlled component

	const handleControlledInputChange = (event) => {
		/* When changing a state object or array,
		always create a copy, make changes, and then set state.*/
		const newEvent = { ...thisEvent }
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		// if (event.target.id.includes("Id")) {
		// 	selectedVal = parseInt(selectedVal)
		// }
		/* event is an object with properties.
		Set the property to the new value
		using object bracket notation. */
		newEvent[event.target.id] = selectedVal
		// update state
		setEvent(newEvent)
	}

	const handleClickSaveEvent = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form
		//const newEvent = {...event}
		// newEvent.name = event.name;
		// newEvent.date = event.date;
		// newEvent.location = event.location;

		if (!thisEvent.name) {
			window.alert("Please provide Name of Event")
		}
		else if (!thisEvent.location) {
			window.alert("Please provide Place of Event")
		}
		else if (!thisEvent.dateStart) {
			window.alert("Please provide Beginning of Event")
		}
		else if (!thisEvent.dateEnd) {
			window.alert("Please provide Ending of Event")
		}
		else if (!thisEvent.address) {
			window.alert("Please provide Street Address for Event")
		}
		else if (!thisEvent.city || !thisEvent.state || !thisEvent.zip) {
			window.alert("Please provide Event Address")
		}
		else {
			//invoke addEvent passing event as an argument.
			//once complete, change the url and display the event list
			apiEventManager.addEntry("events", thisEvent)
				.then(() => history.push("/events"))
		}
	}

	return (
		<section className="eventForm__container">
			<form className="eventForm">
				<h2 className="eventForm__title">New Event</h2>

				<fieldset> {/* GATHER THE NAME OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="name">Name of Event:</label>
						<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name of Event" value={thisEvent.name} />
					</div>
				</fieldset>

				<fieldset> {/* GATHER THE LOCATION OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="location">Place of Event:</label>
						<input type="text" id="location" onChange={handleControlledInputChange} className="form-control" value={thisEvent.location} />
					</div>
				</fieldset>

				<fieldset> {/* GATHER THE START DATE OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="dateStart">Beginning Day of Event:</label>
						<input type="date" id="dateStart" onChange={handleControlledInputChange} className="form-control" value={thisEvent.dateStart} />
					</div>
				</fieldset>

				<fieldset> {/* GATHER THE END DATE OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="dateEnd">Ending Day of Event:</label>
						<input type="date" id="dateEnd" onChange={handleControlledInputChange} className="form-control" value={thisEvent.dateEnd} />
					</div>
				</fieldset>

				<fieldset> {/* GATHER THE ADDRESS OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="address">Address of Event:</label>
						<input type="address" id="address" onChange={handleControlledInputChange} className="form-control" value={thisEvent.address} />
					</div>
				</fieldset>
				<fieldset> {/* GATHER THE CITY OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="city">City:</label>
						<input type="city" id="city" onChange={handleControlledInputChange} className="form-control" value={thisEvent.city} />
					</div>
				</fieldset>
				<fieldset> {/* GATHER THE STATE OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="state">State:</label>
						<input type="state" id="state" onChange={handleControlledInputChange} className="form-control" value={thisEvent.state} />
					</div>
				</fieldset>
				<fieldset> {/* GATHER THE ZIP OF THE EVENT */}
					<div className="form-group">
						<label htmlFor="zip">Zip:</label>
						<input type="zip" id="zip" onChange={handleControlledInputChange} className="form-control" value={thisEvent.zip} />
					</div>
				</fieldset>
				<button className="btn btn-primary"
					onClick={handleClickSaveEvent}>
					Save event
				</button>
			</form>
		</section>
	)
};