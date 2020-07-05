import React from "react";
import "../App.css";

let VisualTodo = ({ time, name }) => {
	let hourtop = time.getHours() * 6.25;
	let minutetop = time.getMinutes() * 0.104167;
	let totaltop = hourtop + minutetop;
	return (
		<div
			className="Event hoverexpand"
			style={{
				zIndex: "4",
				top: totaltop + "vh",
				height: "1.562505vh",
			}}
		>
			<p className="eventtitle">{name}</p>
		</div>
	);
};

export default VisualTodo;
