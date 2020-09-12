import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostToDoData } from "../database";
import { weekcodes } from "./NewEventForm";

let indices = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function NewToDoForm({ uid, setPopup, showPopup, dayClicked, week }) {
	const [newName, setNewName] = useState("");
	const [priority, setPriority] = useState("1");
	const [startDate, setStartDate] = useState(new Date());

	const [week_freq, setWeek_Freq] = useState(1);
	const [selecteddays, setSelectedDays] = useState([]);
	const [endRepeatDate, setEndRepeatDate] = useState();

	let handleClick = (e) => {
		e.preventDefault();
		if (!newName) {
			alert("Hey! Fields can't be blank!");
		} else if (
			!priority ||
			isNaN(parseInt(priority)) ||
			parseInt(priority) <= 0 ||
			parseInt(priority) >= 6
		) {
			alert("Priority must be an integer between 1 (low) and 5 (high)");
		} else {
			let repetition_code;
			selecteddays.length
				? (repetition_code = `${selecteddays.join("")};${week_freq};W;${endRepeatDate ? endRepeatDate.getTime() : ""
					}`)
				: (repetition_code = "");
			let time = startDate.getTime();
			PostToDoData({ uid, newName, time, priority, repetition_code });
			setNewName("");
			setStartDate(new Date());
			setPopup(false);
		}
	};

	useEffect(() => {
		setStartDate(week[indices.indexOf(dayClicked)]);
	}, [dayClicked, week]);

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

	let handleselect = (day) => {
		if (handleEmphasize(day)) {
			setSelectedDays(selecteddays.filter((item) => item !== day));
		} else {
			setSelectedDays((selecteddays) => [...selecteddays, day]);
		}
	};

	let handleEmphasize = (item) => {
		let response = false;
		for (let i = 0; i < selecteddays.length; i++) {
			if (item === selecteddays[i]) {
				response = true;
			}
		}
		return response;
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
			<div className="bottomrows">
				<div className="bottombarwrap">
					{weekcodes.map((item) => {
						return (
							<div
								className={`repeatcircle ${handleEmphasize(item) ? "selected" : null
									}`}
								key={item}
								onClick={() => handleselect(item)}
							>
								<p className="repeatday" key={item}>
									{item === "R" ? "T" : item === "D" ? "S" : item}
								</p>
							</div>
						);
					})}
					<input
						type="text"
						id="rep_frequency"
						value={week_freq}
						onChange={(e) =>
							setWeek_Freq(e.target.value >= 0 ? e.target.value : 1)
						}
					></input>
					<div className="frequencylabelborder">
						<p className="frequencylabel">
							{week_freq <= 1 ? "Week" : "Weeks"}
						</p>
					</div>
				</div>
				<div className="endrepeatdatetime">
					<p>End Repeat:</p>
					<DatePicker
						selected={endRepeatDate}
						minDate={startDate}
						onChange={(date) => setEndRepeatDate(date)}
						timeCaption="End Repeat"
						dateFormat="MMMM d, yyyy"
					/>
				</div>
			</div>
		</form>
	);
}

export default NewToDoForm;
