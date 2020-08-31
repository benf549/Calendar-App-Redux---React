import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PutToDoRequest } from "../database";

let ToDoEdit = ({ todoforedit, tododata, hidepopup, editevent }) => {
	const [newName, setNewName] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [priority, setPriority] = useState(0);
	const [iscomplete, setIsComplete] = useState(false);

	useEffect(() => {
		var test = tododata
			? tododata.find((obj) => {
					return obj.id === todoforedit;
			  })
			: "";
		var titleforedit = test ? test.name : "";
		var startforedit = test ? test.time : new Date();
		var priorityforedit = test ? test.priority : 0;
		var completeforedit = test ? test.iscomplete : false;

		setNewName(titleforedit);
		setStartDate(startforedit);
		setPriority(priorityforedit);
		setIsComplete(completeforedit);
	}, [todoforedit, tododata]);

	useEffect(() => {
		const handleEsc = (event) => {
			if (editevent && event.keyCode === 27) {
				hidepopup();
				console.log("closed");
			}
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, [editevent, hidepopup]);

	let handleClick = (e) => {
		e.preventDefault();
		if (newName === "") {
			alert("Hey! Name can't be blank!");
		} else if (priority === 0) {
			alert("Priority can't be blank!");
		} else {
			let start = startDate.getTime();
			PutToDoRequest(todoforedit, newName, start, priority, iscomplete);
			setNewName("");
			setStartDate(new Date());
			setPriority(0);
			hidepopup();
		}
	};

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
};

export default ToDoEdit;
