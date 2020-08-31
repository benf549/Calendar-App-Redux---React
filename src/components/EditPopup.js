import React, { useState, useEffect } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PutRequest } from "../api";
import { weekcodes } from "./NewEventForm";

let EditPopup = ({ eventforedit, eventlist, hidepopup, editevent }) => {
	const [newName, setNewName] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [week_freq, setWeek_Freq] = useState(1);
	const [selecteddays, setSelectedDays] = useState([]);
	const [endRepeatDate, setEndRepeatDate] = useState();
	const [blacklist, setBlacklist] = useState("");

	useEffect(() => {
		let test = eventlist
			? eventlist.find((obj) => {
					return obj.id === eventforedit;
			  })
			: "";
		let titleforedit = test ? test.title : "";
		let startforedit = test ? new Date(parseInt(test.ostarted)) : new Date();
		let endforedit = test ? new Date(parseInt(test.oended)) : new Date();
		let repeatbehavior = test ? test.repeatstruct.split(";")[0].split("") : "";
		let blacklistforset = test ? test.blacklist : "";
		let repeatfreq = test
			? test.repeatstruct
				? parseInt(test.repeatstruct.split(";")[1])
				: 1
			: 1;
		let repeatend = test
			? test.repeatstruct.split(";")[3]
				? new Date(parseInt(test.repeatstruct.split(";")[3]))
				: ""
			: "";

		setNewName(titleforedit);
		setStartDate(startforedit);
		setEndDate(endforedit);
		setSelectedDays(repeatbehavior);
		setWeek_Freq(repeatfreq);
		setEndRepeatDate(repeatend);
		setBlacklist(blacklistforset);
	}, [eventforedit, eventlist]);

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

			PutRequest(eventforedit, newName, start, end, repetition_code, blacklist);

			setNewName("");
			setStartDate(new Date());
			setEndDate(new Date());
			setBlacklist("");
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
};

export default EditPopup;
