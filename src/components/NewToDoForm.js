import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostToDo } from "../api/todo";

function NewToDoForm({ setfetchtodo, setPopup, showPopup }) {
	const [newName, setNewName] = useState("");
	const [priority, setPriority] = useState(1);
	const [startDate, setStartDate] = useState(new Date());

	let handleClick = (e) => {
		e.preventDefault();
		if (newName === "" || priority === "") {
			alert("Hey! Fields can't be blank!");
		} else {
			let time = startDate.getTime();
			PostToDo({ newName, time, priority, setfetchtodo });
			setNewName("");
			setStartDate(new Date());
			setPopup(false);
		}
	};

	// Allows you to close the new event form by pressing esc key
	useEffect(() => {
		const handleEsc = (event) => {
			if (showPopup && event.keyCode === 27) {
				setPopup(false);
				console.log("closed");
			}
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [showPopup, setPopup]);

	return (
		<form>
			<div className="inputlayout">
				<label htmlFor="name">Name</label>
				<div className="NameContainer">
					<input
						type="text"
						id="name"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
			</div>

			<div className="inputlayout">
				<label htmlFor="date">Start Date</label>
				<div className="testwrap">
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						showTimeSelect
						timeFormat="h:mm aa"
						timeIntervals={15}
						timeCaption="Start Time"
						dateFormat="MMMM d, yyyy h:mm aa"
					/>
				</div>
			</div>
			<div className="inputlayout">
				<label htmlFor="priority">Priority</label>
				<div className="NameContainer">
					<input
						type="text"
						id="priority"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					/>
				</div>
			</div>

			<button className="finalsubmit" type="submit" onClick={handleClick}>
				Submit
			</button>
		</form>
	);
}

export default NewToDoForm;
