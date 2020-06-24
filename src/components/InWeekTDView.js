import React from "react";
import { DeleteTodo } from "../api/todo";

const ToDoEvent = ({ name, time, priority, iscomplete, id, setfetchtodo }) => {
	return (
		<div className="todoitem">
			<div
				className="markoff"
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
					style={{
						color: iscomplete
							? "grey"
							: priority === 5
							? "var(--red-accent)"
							: "black",
					}}
				>
					{name}
				</h4>
				<div className="timeandarchive">
					<p id="todotime">{`${
						time.getHours() > 12
							? time.getHours() - 12
							: time.getHours() === 0
							? 12
							: time.getHours()
					}:${
						time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
					}${time.getHours() > 11 ? "pm" : "am"}`}</p>
					<p className="archive" onClick={() => DeleteTodo(id, setfetchtodo)}>
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

	if (data) {
		for (let todo = 0; todo < data.length; todo++) {
			if (
				dayClicked &&
				data[todo].time.getDate() === week[weekind].getDate() &&
				data[todo].time.getMonth() === week[weekind].getMonth() &&
				data[todo].time.getFullYear() === week[weekind].getFullYear()
			) {
				currentDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			} else if (
				dayClicked === "Sun" &&
				data[todo].time.getDate() === nextweek[0].getDate() &&
				data[todo].time.getMonth() === nextweek[0].getMonth() &&
				data[todo].time.getFullYear() === nextweek[0].getFullYear()
			) {
				nextDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			} else if (
				dayClicked === "Sun" &&
				data[todo].time.getDate() === nextweek[1].getDate() &&
				data[todo].time.getMonth() === nextweek[1].getMonth() &&
				data[todo].time.getFullYear() === nextweek[1].getFullYear()
			) {
				thirdDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			} else if (
				dayClicked === "Sat" &&
				data[todo].time.getDate() === nextweek[0].getDate() &&
				data[todo].time.getMonth() === nextweek[0].getMonth() &&
				data[todo].time.getFullYear() === nextweek[0].getFullYear()
			) {
				thirdDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			} else if (
				dayClicked &&
				dayClicked !== "Sun" &&
				data[todo].time.getDate() === week[weekind + 1].getDate() &&
				data[todo].time.getMonth() === week[weekind + 1].getMonth() &&
				data[todo].time.getFullYear() === week[weekind + 1].getFullYear()
			) {
				nextDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			} else if (
				dayClicked &&
				dayClicked !== "Sun" &&
				dayClicked !== "Sat" &&
				data[todo].time.getDate() === week[weekind + 2].getDate() &&
				data[todo].time.getMonth() === week[weekind + 2].getMonth() &&
				data[todo].time.getFullYear() === week[weekind + 2].getFullYear()
			) {
				thirdDayTodos.push(
					<ToDoEvent
						key={data[todo].id}
						name={data[todo].name}
						time={data[todo].time}
						priority={data[todo].priority}
						iscomplete={data[todo].iscomplete}
						id={data[todo].id}
						setfetchtodo={setfetchtodo}
					/>
				);
			}
		}
	}

	if (data) {
		return (
			<div className="TDview">
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
