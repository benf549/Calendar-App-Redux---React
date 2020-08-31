import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PostEventData } from "../database";

export let weekcodes = ["M", "T", "W", "R", "F", "S", "D"];

function NewEventForm({ uid, setPopup, showPopup, week }) {
	const [newName, setNewName] = useState("");
	const [startDate, setStartDate] = useState(week[0]);
	const [endDate, setEndDate] = useState(week[0]);
	const [week_freq, setWeek_Freq] = useState(1);
	const [selecteddays, setSelectedDays] = useState([]);
	const [endRepeatDate, setEndRepeatDate] = useState();

	let handleClick = (e) => {
		e.preventDefault();
		if (newName === "") {
			alert("Hey! Name can't be blank!");
		} else if (endDate.getTime() - startDate.getTime() <= 0) {
			alert("Hey! End date can't be before start date");
		} else {
			let start = startDate.getTime();
			let end = endDate.getTime();
			let repetition_code;
			selecteddays.length
				? (repetition_code = `${selecteddays.join("")};${week_freq};W;${
						endRepeatDate ? endRepeatDate.getTime() : ""
				  }`)
				: (repetition_code = "");
			PostEventData({ uid, newName, start, end, repetition_code });
			setNewName("");
			setStartDate(new Date());
			setEndDate(new Date());
			setPopup(false);
			setEndRepeatDate();
			setSelectedDays([]);
		}
	};

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

	// Allows you to close the new event form by pressing esc key
	useEffect(() => {
		if (showPopup === false) {
			setSelectedDays([]);
			setEndRepeatDate();
		}
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

	useEffect(() => {
		setEndDate(startDate);
	}, [startDate]);

	useEffect(() => {
		setStartDate(week[0]);
		setEndDate(week[0]);
	}, [week]);

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
				<label htmlFor="date">End Date</label>
				<div className="testwrap">
					<DatePicker
						selected={endDate}
						minDate={startDate}
						onChange={(date) => setEndDate(date)}
						showTimeSelect
						timeFormat="h:mm aa"
						timeIntervals={15}
						timeCaption="End Time"
						dateFormat="MMMM d, yyyy h:mm aa"
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
								className={`repeatcircle ${
									handleEmphasize(item) ? "selected" : null
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

export default NewEventForm;
