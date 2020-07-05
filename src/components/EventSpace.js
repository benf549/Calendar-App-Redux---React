import React from "react";
import "../App.css";

let days = [1, 2, 3, 4, 5, 6, 0];

let EventGrid = ({ weekofevents, weekoftodos, day }) => {
	return (
		<div className="eventgrid">
			{weekofevents[day].map((item) => item)}
			{weekoftodos[day].map((item) => item)}
		</div>
	);
};

let EventSpace = ({ weekofevents, weekoftodos, week }) => {
	let today = new Date();
	let hourtop = today.getHours() * 6.25;
	let minutetop = today.getMinutes() * 0.104167;
	let totaltop = hourtop + minutetop;
	let todayday = today.getDay();
	let todaydate;

	switch (todayday) {
		case 0:
			todaydate = week[6];
			break;
		default:
			todaydate = week[todayday - 1];
	}

	return (
		<div className="eventspace">
			<div className="spacer"></div>
			{days.map((day) => (
				<div key={day} className="eventunit" id={day}>
					<div
						className="currenttime"
						style={{
							top: totaltop + "vh",
							display:
								todaydate.getDay() === day &&
								today.getDate() === todaydate.getDate() &&
								today.getMonth() === todaydate.getMonth() &&
								today.getFullYear() === todaydate.getFullYear()
									? "inline"
									: "none",
						}}
					></div>
					<EventGrid
						weekofevents={weekofevents}
						weekoftodos={weekoftodos}
						key={day}
						day={day}
					/>
					<div className="displayspacer"></div>
				</div>
			))}
		</div>
	);
};

export default EventSpace;
