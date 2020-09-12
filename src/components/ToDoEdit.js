import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PutToDoRequest } from "../database";
import { weekcodes } from "./NewEventForm";


let ToDoEdit = ({ todoforedit, tododata, hidepopup, editevent }) => {
	const [newName, setNewName] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [priority, setPriority] = useState(0);
	const [iscomplete, setIsComplete] = useState(false);

	const [week_freq, setWeek_Freq] = useState(1);
	const [selecteddays, setSelectedDays] = useState([]);
	const [endRepeatDate, setEndRepeatDate] = useState();

	const [blacklist, setBlacklist] = useState("");


	useEffect(() => {
		let titleforedit = "";
		let startforedit = new Date();
		let priorityforedit = 0;
		let completeforedit = false
		let blacklistforset = ""
		let repeatbehavior = ""
		let repeatfreq = 1
		let repeatend = ""

		var test = tododata
			? tododata.find((obj) => {
				return obj.id === todoforedit;
			})
			: "";

		if (test) {
			titleforedit = test.name;
			startforedit = test.time;
			priorityforedit = test.priority;
			completeforedit = test.iscomplete;
			blacklistforset = test.blacklist;
			repeatbehavior = test.repetition ? test.repetition.split(";")[0].split("") : "";
			repeatfreq = test.repetition ? parseInt(test.repetition.split(";")[1]) : 1;
			repeatend = test.repetition ? test.repetition.split(";")[3]
				? new Date(parseInt(test.repetition.split(";")[3]))
				: "" : "";
		}

		setNewName(titleforedit);
		setStartDate(startforedit);
		setPriority(priorityforedit);
		setIsComplete(completeforedit);
		setSelectedDays(repeatbehavior)
		setBlacklist(blacklistforset);
		setWeek_Freq(repeatfreq);
		setEndRepeatDate(repeatend)
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
		if (!newName) {
			alert("Hey! Name can't be blank!");
		} else if (!priority ||
			isNaN(parseInt(priority)) ||
			parseInt(priority) <= 0 ||
			parseInt(priority) >= 6) {
			alert("Priority can't be blank!");
		} else {
			let start = startDate.getTime();
			let repetition_code
			selecteddays.length
				? (repetition_code = `${selecteddays.join("")};${week_freq};W;${endRepeatDate ? endRepeatDate.getTime() : ""
					}`)
				: (repetition_code = "");
			PutToDoRequest(todoforedit, newName, start, priority, iscomplete, repetition_code);

			setNewName("");
			setStartDate(new Date());
			setBlacklist("")
			setPriority(0);
			hidepopup();
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
};

export default ToDoEdit;
