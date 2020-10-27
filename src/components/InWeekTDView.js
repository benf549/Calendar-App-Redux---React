import React from "react";
import { DeleteToDoRequest, PutToDoRequest } from "../database";
import { weekinms, truecodes, updateDays, checktodoblacklist } from "./MainApplication"

let checkdmy = (day, week) => {
	//checks that the day, month, and year of the two datetime objects are the same.
	let flag = false
	if (day.getDate() === week.getDate() && day.getMonth() === week.getMonth() && day.getFullYear() === week.getFullYear()) {
		flag = true
	}
	return flag
}

let arraysEqual = (a, b) => {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

const ToDoEvent = ({
	name,
	time,
	priority,
	iscomplete,
	id,
	showTodoForEdit,
	repetition_code,
	blacklist,
	day
}) => {
	return (
		<div className="todoitem">
			<div
				className="markoff"
				onClick={() => {
					let blacklist_array = blacklist ? blacklist.split(';') : []
					let filtered_array = blacklist_array.filter(item => item !== day.toString())
					if (arraysEqual(blacklist_array, filtered_array)) {
						filtered_array.push(day.toString())
					}
					console.log(filtered_array)
					PutToDoRequest(
						id,
						name,
						time.getTime().toString(),
						priority,
						iscomplete,
						repetition_code,
						filtered_array.join(';')
					)
				}
				}
				style={
					priority === 5
						? {
							backgroundColor: "rgba(255,0,0,0.3)",
							boxShadow: "inset 0 0 1vw var(--red-accent)",
						}
						: {
							backgroundColor: "rgba(0,0,0,0.3)",
							boxShadow: "inset 0 0 1vw black",
						}
				}
			></div>
			<div className="belowtodoitem">
				<h4
					onClick={() => showTodoForEdit(id)}
					style={{
						color: !checktodoblacklist(day.toString(), blacklist.split(';'))
							? "grey"
							: priority === 5
								? "var(--red-accent)"
								: "black",
					}}
				>
					{name}
				</h4>
				<div className="timeandarchive">
					<p onClick={() => showTodoForEdit(id)} id="todotime">{`${time.getHours() > 12
						? time.getHours() - 12
						: time.getHours() === 0
							? 12
							: time.getHours()
						}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
						}${time.getHours() > 11 ? "pm" : "am"}`}</p>
					<p className="archive" onClick={() => DeleteToDoRequest(id)}>
						Archive
					</p>
				</div>
			</div>
		</div>
	);
};

const InWeekTDView = ({
	dayClicked,
	week,
	nextweek,
	data,
	setfetchtodo,
	setShowTodo,
	showTodoForEdit
}) => {
	let dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	let fulldow = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	let weekind;

	if (dayClicked) {
		for (let day = 0; day < dow.length; day++) {
			if (dayClicked === dow[day]) {
				weekind = day;
			}
		}
	}
	let currentDayTodos = [];
	let nextDayTodos = [];
	let thirdDayTodos = [];
	let incompleteTodos = [];

	if (data) {
		for (let todo = 0; todo < data.length; todo++) {
			let tdevent = (
				<ToDoEvent
					key={data[todo].id}
					name={data[todo].name}
					time={data[todo].time}
					priority={data[todo].priority}
					iscomplete={data[todo].iscomplete}
					id={data[todo].id}
					setfetchtodo={setfetchtodo}
					showTodoForEdit={showTodoForEdit}
					repetition_code={data[todo].repetition}
					blacklist={data[todo].blacklist}
					day={data[todo].time.getTime()}
				/>
			);
			if (
				dayClicked &&
				!data[todo].iscomplete && //update to check blacklist rather than iscomplete.
				data[todo].time.getTime() < new Date().getTime()
			) {
				incompleteTodos.push(tdevent);
			}
			if (
				dayClicked &&
				checkdmy(data[todo].time, week[weekind])
			) {
				currentDayTodos.push(tdevent);
			} else if (
				dayClicked === "Sun" &&
				checkdmy(data[todo].time, nextweek[0])
			) {
				nextDayTodos.push(tdevent);
			} else if (
				dayClicked === "Sun" &&
				checkdmy(data[todo].time, nextweek[1])
			) {
				thirdDayTodos.push(tdevent);
			} else if (
				dayClicked === "Sat" &&
				checkdmy(data[todo].time, nextweek[0])
			) {
				thirdDayTodos.push(tdevent);
			} else if (
				dayClicked &&
				dayClicked !== "Sun" &&
				checkdmy(data[todo].time, week[weekind + 1])
			) {
				nextDayTodos.push(tdevent);
			} else if (
				dayClicked &&
				dayClicked !== "Sun" &&
				dayClicked !== "Sat" &&
				checkdmy(data[todo].time, week[weekind + 2])
			) {
				thirdDayTodos.push(tdevent);
			}
			let isenddate = (endtime, day) => {
				//Handle repeat behavior. Similar to repeatevents array processing in Main Application.
				let response = true;
				if (endtime && day > endtime.setHours(0, 0, 0, 0)) {
					response = false;
				}
				return response;
			};

			let codearray = data[todo].repetition ? data[todo].repetition.split(";") : []
			let repetition_days = codearray ? codearray[0] : []
			let number_to_skip = codearray[1]

			let endtime = codearray[3] ? new Date(parseInt(codearray[3])) : null;

			let blacklist = data[todo].blacklist.toString().split(';')

			let thistime = data[todo].time.getTime();
			let initial_repeat_week = updateDays(thistime);


			let calc1 = week[6].setHours(0, 0, 0, 0);
			let calc2 = initial_repeat_week[6].setHours(0, 0, 0, 0);

			//adds repeats to the todo visualizer ui for events that occur on selected day
			if (repetition_days) {
				for (let w = 0; w < week.length; w++) {
					let day = week[w].setHours(0, 0, 0, 0)
					let current_next_week = updateDays(new Date(day + weekinms))
					for (let d = 0; d < repetition_days.length; d++) {

						let event_to_push = (<ToDoEvent
							key={`${data[todo].id}.${repetition_days[d]}`}
							name={data[todo].name}
							time={data[todo].time}
							priority={data[todo].priority}
							iscomplete={data[todo].iscomplete}
							id={data[todo].id}
							setfetchtodo={setfetchtodo}
							showTodoForEdit={showTodoForEdit}
							repetition_code={data[todo].repetition}
							blacklist={data[todo].blacklist}
							day={day}
						/>);

						if (truecodes[w] === truecodes[truecodes.indexOf(repetition_days[d])] &&
							day > data[todo].time.getTime() &&
							Math.floor(((calc1 - calc2) / weekinms) % number_to_skip) === 0
							&& checktodoblacklist(day, blacklist)
						) {
							if (
								dayClicked &&
								isenddate(endtime, day) &&
								checkdmy(new Date(day), week[weekind])
							) {
								currentDayTodos.push(event_to_push)
							} else if (
								dayClicked === "Sun" &&
								isenddate(endtime, day + weekinms) &&
								checkdmy(new Date(day + weekinms), current_next_week[0])
							) {
								nextDayTodos.push(event_to_push)
							} else if (
								dayClicked === "Sun" &&
								isenddate(endtime, day + weekinms) &&
								checkdmy(new Date(day + weekinms), current_next_week[1])

							) {
								thirdDayTodos.push(event_to_push)
							} else if (
								dayClicked === "Sat" && isenddate(endtime, day + weekinms) &&
								checkdmy(new Date(day + weekinms), current_next_week[0])
							) {
								thirdDayTodos.push(event_to_push);
							} else if (
								dayClicked &&
								dayClicked !== "Sun" && isenddate(endtime, day) &&
								checkdmy(new Date(day), week[weekind + 1])

							) {
								nextDayTodos.push(event_to_push);
							} else if (
								dayClicked &&
								dayClicked !== "Sun" &&
								dayClicked !== "Sat" && isenddate(endtime, day) &&
								checkdmy(new Date(day), week[weekind + 2])
							) {
								thirdDayTodos.push(event_to_push);
							}
						}
					}
				}
			}
		}
	}

	if (data) {
		return (
			<div className="TDview">
				<h3
					className="dayofweek"
					style={{ display: incompleteTodos.length ? "inline-block" : "none" }}
				>
					Incomplete Tasks
				</h3>
				{incompleteTodos.map((item) => {
					return item;
				})}

				<h3 className="dayofweek">{fulldow[weekind]}</h3>
				{currentDayTodos.map((item) => {
					return item;
				})}
				<h3 className="dayofweek">
					{dayClicked === "Sun" ? fulldow[0] : fulldow[weekind + 1]}
				</h3>
				{nextDayTodos.map((item) => {
					return item;
				})}
				<h3 className="dayofweek">
					{dayClicked === "Sun"
						? fulldow[1]
						: dayClicked === "Sat"
							? fulldow[0]
							: fulldow[weekind + 2]}
				</h3>
				{thirdDayTodos.map((item) => {
					return item;
				})}
				<div className="TDbottombar" onClick={() => setShowTodo(true)}>
					<p>New To-Do </p>
					<i className="fas fa-pen"></i>{" "}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default InWeekTDView;
