import React from "react";
import "../App.css";

let VisualTodo = ({
	time,
	name,
	priority,
	iscomplete,
	day,
	selectForShowTask,
}) => {
	let hourtop = time.getHours() * 6.25;
	let minutetop = time.getMinutes() * 0.104167;
	let totaltop = hourtop + minutetop;
	let dayforshowing = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return (
		<div
			className="visualtodo"
			onClick={() => selectForShowTask(dayforshowing[new Date(day).getDay()])}
			style={{
				display: iscomplete ? "none" : "inline-block",
				zIndex: "4",
				top: totaltop + "vh",
				height: "3vh",
				backgroundColor:
					priority === 5 ? "rgba(255, 0, 0, 0.7)" : "rgba(0,0,0,0.5)",
			}}
		>
			<p className="eventtitle">{name}</p>
		</div>
	);
};

export default VisualTodo;
